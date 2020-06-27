import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

import firebase as fb

class Data:
    def __init__(self, df, target_parameter, df_variables, nan_method="drop"):
        # keep as original data (no in place changes, just in case)
        self.df = df
        self.processed = False

        if target_parameter is not None:
            self.processed = True

            self.target_str = target_parameter
            self.df_vars_str = df_variables

            # process dataframe
            self.nan_method = nan_method
            self.processed_df = self.nan_handler(self.df, self.nan_method)

            self.target = self.processed_df[target_parameter]
            col_name_list = list(self.processed_df.columns)

            for col in df_variables:
                if col in col_name_list:
                    col_name_list.remove(col)

            self.processed_df = self.processed_df.drop(col_name_list, axis=1)

            # now target contains the labels, and df contains the variables
            self.X_train, self.X_test, self.y_train, self.y_test = \
                self.make_train_test_split(self.processed_df.to_numpy(), self.target.to_numpy())

    def nan_handler(self, df, method):
        # take care of nan values
        if method == "drop":
            return df.dropna()
        elif method == "zeros":
            return df.fillna(0)
        elif method == "mean":
            return df.fillna(df.mean())
        elif method == "median":
            return df.fillna(df.median())
        else:
            raise ValueError("Invalid fill nan method")

    def make_train_test_split(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
        return X_train, X_test, y_train, y_test

    def get_train_test_split(self):
        return self.X_train, self.X_test, self.y_train, self.y_test

    def count_NaN(self):
        '''
        REQUIRES: df some valid pandas dataframe
        ENSURES:  returns the number of NaN's in the entire dataframe 
        '''
        return int(self.df.isnull().sum().sum())
    
    def get_info(self):
        '''
        REQUIRES: df some valid pandas dataframe
        ENSURES:  returns a dictionary containing varius info on a CSV
        '''
        info = {}
        info['NaN'] = self.count_NaN()
        return info

    def pre_describe(self):
        '''
        ENSURES:  updates the proj_id firestore document to contain a field with info
        '''

        info = self.get_info()
        project_ref = db.collection("projects").document(proj_id)
        project_ref.update({"info": info})
        return info
    
    def get_information(self, input_variable):
        """
        Function to return descriptive stats to display on our sliders
        REQUIRES: df some valid pandas dataframe, input_variable a valid key
        ENSURES: a dictionary representation of descriptive stats
        """
        ref = self.df.describe()[input_variable]
        likely_continuous = 1.*self.df[input_variable].nunique()/self.df[input_variable].count() > 0.05
        info = {
            "name": input_variable,
            "lo": ref[3],
            "hi": ref[7],
            "q1": ref[4],
            "q2": ref[5],
            "q3": ref[6],
            "continuous": True if likely_continuous else False,
        }
        return info

    def get_variables(self, input_list):
        """
        Second order function to get descriptive stats for all variables
        REQUIRES: input_list a valid list of all headers in the dataframe
        ENSURES: a list of dictionary representations of descriptive stats
        """
        variables = []
        for inp in input_list:
            variables.append(self.get_information(inp))
        return variables


    def send_vars(self, proj_id, model_list):
        """
        A function to update Google Firestore database accordingly
        REQUIRES: df a pandas dataframe, db a client-side instance to firestore,
                proj_id the unique hash for that particular project,
                input_list a string list of df headers,
                model_list a string list of sklearn models being used for this project
                target_param str represent the df header that user wants to predict
        ENSURES: Updates the fields "variables" with a list of dictionary of desc stats,
                "models" with list of models user is using, "targetParam" with desired 
                output.
        """
        db = fb.firestore.client()

        project_ref = db.collection("projects").document(proj_id)
        project_ref.update({"variables": self.get_variables(self.df_vars_str), 
            "models": self.get_model_obj(model_list), "targetParam": self.target_str})
        return None

    def from_csv(uid, proj_id, csv_name):
        bucket = fb.bucket_init()
        db = fb.firestore.client()
        # Get the dataframe
        df = fb.get_csv(bucket, fb.make_path(
            str(uid), str(proj_id), str(csv_name)))
        
        return Data(df, None, None, None)

    def get_model_obj(self, model_list):
        '''
        REQUIRES: model_list a list of model codes (ie gnb, lda, etc)
        ENSURES: a dictionary/object with keys as these codes. The values 
        of this dictionary are dictionaries with the fields
        "accuracy", and other future model metadata
        '''
        models = {}
        for m in model_list:
            models[m.type] = {"accuracy": m.get_accuracy(self.X_test, self.y_test)}
        return models