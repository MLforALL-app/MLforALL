import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.preprocessing import MinMaxScaler

import firebase as fb
import pickle

import sys

class Model:
    
    models = {
        "log_reg": LogisticRegression,
        "clf": DecisionTreeClassifier,
        "knn": KNeighborsClassifier,
        "lda": LinearDiscriminantAnalysis,
        "gnb": GaussianNB,
        "svm": SVC,
    }
    
    def __init__(self, model_type=""):
        """
        REQUIRES: model_type in models == True
        """
        if model_type not in self.models and model_type != "":
            raise ValueError(f"Invalid model name: {model_type}.")

        if model_type != "":
            self.type = model_type
            self.model = self.models[model_type]()
        else:
            self.type = None
            self.model = None
        self.scaler = None

    def build(self, X, y):
        self.scaler = MinMaxScaler()
        X = self.scaler.fit_transform(X)
        return self.model.fit(X, y.reshape(-1))
    
    def predict(self, prediction_variables):
        """
        REQUIRES: loaded_model a representation of our loaded model object
                prediction_variables a well-typed list of length expected 
                args for loaded model 
        ENSURES: returns what that particularly trained model predicts
                given those inputs
        """
        X_predict = [list(map(float, prediction_variables))]
        if self.scaler is not None:
            X_predict = self.scaler.transform(X_predict)
        guess = self.model.predict(X_predict)
        # issues with jsonify and numpy Int64
        if(isinstance(guess[0], str)):
            return guess[0]
        return float(guess[0])
    
    def get_accuracy(self, X, y):
        if self.scaler is not None:
            X = self.scaler.transform(X)
        guess = self.model.predict(X)
        return np.mean(guess == y.reshape(-1))

    def pickle(self):
        return pickle.dumps(self)
    
    def load_model(uid, pid, model_type):
        """
        REQUIRES: uid valid user id (string)
                  pid valid project id (string)
                  model_type valid model type (string)
        ENSURES: returns a Model object corresponding to 
        the user uid, project pid, and model model_type
        """
        # get firebase stuff
        path = fb.make_path(uid, pid, model_type)
        bucket = fb.bucket_init()

        # load model
        unpickled_model = fb.get_pickle(bucket, path)
        if isinstance(unpickled_model, Model):
            return unpickled_model
        model = Model()
        model.type = model_type
        model.model = unpickled_model

        return model
