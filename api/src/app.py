import os
import firebase as fb
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import Model
from data import Data

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def home():
    return """
        <!DOCTYPE html>
        <body style="width: 880px; margin: auto;">
        <h1> ML For All </h1>
        <p>Welcome to Davis, Max, and Len's API for ML For All </p>
        </body>
            """


@app.route('/predict', methods=['POST'])  # GET requests will be blocked
def predict_from_model():
    req_data = request.get_json()
    # Brackets require these fields to be present
    # Sort of a safety contract to ensure we always have valid path
    uid = req_data['uid']  # user id
    pid = req_data['projId']  # project id
    model = req_data['model']  # desired model name
    inputs = req_data['inputs']  # df vars / x_predict

    model = Model.load_model(str(uid), str(pid), str(model))
    prediction = model.predict(inputs)
    return jsonify(prediction)


# assume csv has been made, now upload models
@app.route('/store', methods=['POST'])
def store():
    # once we know what implement fetching the csv from firebase, that'll go in the call
    req_data = request.get_json()

    # Brackets require these fields to be present
    # Sort of a safety contract to ensure we always have valid path
    uid = req_data['uid']  # user id
    proj_id = req_data['projId']  # unique project hash
    model_list = req_data['modelList']  # list of models user uses
    target_param = req_data['targetParameter']  # output
    df_vars = req_data['dfVariables']  # inputs
    csv_path = req_data['csvPath']  # name of uploaded csv
    nan_method = req_data['nanMethod']  # method for dealing with NaN's

    # Get firebase stuff
    bucket = fb.bucket_init()

    df = fb.get_csv(bucket, csv_path)

    data = Data(df, target_param, df_vars, nan_method)
    X_train, X_test, y_train, y_test = data.get_train_test_split()
    onehot_features = data.get_onehot_dict()

    try:
        # populate storage with models
        trained_models = []
        for model_type in model_list:
            model = Model(model_type)
            model.build(X_train, y_train, onehot_features)
            # get the saved model in byte form
            pickle_bytes = model.pickle()
            # send it to firebase storage
            fb.send_pickle(bucket, pickle_bytes,
                           fb.make_path(str(uid), str(proj_id), str(model_type)))
            trained_models.append(model)
        # update firestore with descriptive stats (IQR)
        data.send_vars(proj_id, trained_models)
        return jsonify({"result": "success"}), 200
    except ValueError as e:
        print(f"failed {e}")
        return jsonify({"result" : "failure", "error": "520", "message": f"Build Failed: {e}"}), 500


@app.route('/visual', methods=['GET'])
def visual():
    # api call should pass in what kind of graph, a way to get the csv,
    # and what data for what axis
    return None


@app.route('/describe', methods=['POST'])
def describe():
    # this is a route for getting descriptive statistics about the dataframe
    # necessary to help users make informed decisions when creating models
    req_data = request.get_json()
    print(f'this is the reqdata {req_data}')
    # Brackets require these fields to be present
    # Sort of a safety contract to ensure we always have valid path
    proj_id = req_data['projId']  # unique project hash
    newPath = req_data['csvPath']
    data = Data.from_csv(newPath)
    description = data.pre_describe(proj_id)
    return jsonify(description)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get('PORT', 8080)))
