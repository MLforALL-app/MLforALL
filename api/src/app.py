import os
from visual import dummyvisual
from predict import predict
from build import build_and_pickle
import firebase as fb
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
    uid = req_data['uid']
    project = req_data['project']
    model = req_data['model']
    inputs = req_data['inputs']
    # Get firebase stuff
    path = fb.make_path(uid, project, model)
    bucket = fb.bucket_init()
    # Get loaded model
    loaded_model = fb.get_pickle(bucket, path)
    return jsonify(predict(loaded_model, inputs))


# assume csv has been made, now upload models
@app.route('/store', methods=['POST'])
def store():
    # once we know what implement fetching the csv from firebase, that'll go in the call
    req_data = request.get_json()
    # Brackets require these fields to be present
    # Sort of a safety contract to ensure we always have valid path
    uid = req_data['uid']
    project = req_data['project']
    model_list = req_data['modelList']
    target_param = req_data['targetParameter']
    df_vars = req_data['dfVariables']
    csv_name = req_data['csvName']

    # Get firebase stuff
    bucket = fb.bucket_init()
    try:
        for model in model_list:
            df = fb.get_csv(bucket, fb.make_path(uid, project, csv_name))
            pickle_bytes = build_and_pickle(df, target_param, df_vars, model)
            fb.send_pickle(bucket, pickle_bytes,
                           fb.make_path(uid, project, model))
        return "it worked"
    except TypeError:
        return "it failed"


@app.route('/visual', methods=['GET'])
def visual():
    # api call should pass in what kind of graph, a way to get the csv,
    # and what data for what axis
    return jsonify(dummyvisual())


@app.route('/descriptive', methods=['GET'])
def describe():
    # this is a route for getting descriptive statistics about the dataframe
    # necessary to help users make informed decisions when creating models
    return None


# when uploading to pythonanywhere,
# comment this line out --> I dont think this applies after these changes
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
