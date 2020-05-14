from visual import dummyvisual
from predict import dummypredict
import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return "Welcome to Len and Davis' API"


@app.route('/visual', methods=['GET'])
def visual():
    return jsonify(dummyvisual())


@app.route('/predict', methods=['GET'])
def predict():
    return jsonify(dummypredict())


# when uploading to pythonanywhere,
# comment this line out
# app.run()
