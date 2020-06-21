'''
import pandas as pd
import pickle
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
'''


def floatCast(num):
    # function to avoid numpy cast errors
    return float(num)


def predict(loaded_model, prediction_variables):
    """
    REQUIRES: loaded_model a representation of our loaded model object
              prediction_variables a well-typed list of length expected 
              args for loaded model 
    ENSURES: returns what that particularly trained model predicts
             given those inputs
    """
    X_predict = [list(map(floatCast, prediction_variables))]
    guess = loaded_model.predict(X_predict)
    # issues with jsonify and numpy Int64
    if(isinstance(guess[0], str)):
        return guess[0]
    else:
        return float(guess[0])
