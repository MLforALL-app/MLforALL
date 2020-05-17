from visual import dummyvisual
from predict import dummypredict
from flask import Flask, request, jsonify

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

# giv csv, store model
@app.route('/store', methods=['GET'])
def store():
    # once we know what implement fetching the csv from firebase, that'll go in the call
    return jsonify(dummypredict())


@app.route('/visual', methods=['GET'])
def visual():
    # api call should pass in what kind of graph, a way to get the csv,
    # and what data for what axis
    return jsonify(dummyvisual())


@app.route('/descriptive', methods=['Get'])
def predict():
    # this is a route for getting descriptive statistics about the dataframe
    # necessary to help users make informed decisions when creating models
    return None


# when uploading to pythonanywhere,
# comment this line out
app.run()
