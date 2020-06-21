import os
from predict import predict
from build import build_and_pickle
from variables import send_vars
import firebase as fb
from describe import pre_describe
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def home():
    return """
        <!DOCTYPE html>
        <body style="width: 880px; margin: auto;">
        <h1> ML For All </h1>
        <p>Welcome to Davis and Len's API for ML For All </p>
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
    # Get firebase stuff
    path = fb.make_path(str(uid), str(pid), str(model))
    bucket = fb.bucket_init()
    # Get loaded model and predict
    loaded_model = fb.get_pickle(bucket, path)
    return jsonify(predict(loaded_model, inputs))


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
    csv_name = req_data['csvName']  # name of uploaded csv
    nan_method = req_data['nanMethod']  # method for dealing with NaN's

    # Get firebase stuff
    bucket = fb.bucket_init()
    db = fb.firestore.client()

    try:
        # populate storage with models
        for model in model_list:
            # retrieve the csv everytime due to some weird "key errors"
            df = fb.get_csv(bucket, fb.make_path(
                str(uid), str(proj_id), str(csv_name)))
            # get the saved model in byte form
            pickle_bytes = build_and_pickle(
                df, target_param, df_vars, model, nan_method=str(nan_method))
            # send it to firebase storage
            fb.send_pickle(bucket, pickle_bytes,
                           fb.make_path(str(uid), str(proj_id), str(model)))
        # update firestore with descriptive stats (IQR)
        send_vars(df, db, proj_id, df_vars, model_list, target_param)
        return "it worked"
    except ValueError as e:
        return f"it failed: {e}"


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
    # Brackets require these fields to be present
    # Sort of a safety contract to ensure we always have valid path
    uid = req_data['uid']  # user id
    proj_id = req_data['projId']  # unique project hash
    csv_name = req_data['csvName']
    # Get firebase stuff
    bucket = fb.bucket_init()
    db = fb.firestore.client()
    # Get the dataframe
    df = fb.get_csv(bucket, fb.make_path(
        str(uid), str(proj_id), str(csv_name)))
    # Generate info
    return jsonify(pre_describe(db, df, proj_id))


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get('PORT', 8080)))
