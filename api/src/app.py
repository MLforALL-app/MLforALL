from visual import dummyvisual
from predict import predict
from firebase import make_path, bucket_init, get_pickle
from flask import Flask, request, jsonify
import os

app = Flask(__name__)
app.config["DEBUG"] = True


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
    path = make_path(uid, project, model)
    bucket = bucket_init()
    # Get loaded model
    loaded_model = get_pickle(bucket, path)
    return jsonify(predict(loaded_model, inputs))


# giv csv, store model
@app.route('/store', methods=['GET'])
def store():
    # once we know what implement fetching the csv from firebase, that'll go in the call
    return None


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
    app.run(debug=True, host = '0.0.0.0', port = int(os.environ.get('PORT', 8080)))
