from sklearn.model_selection import train_test_split
import firebase as fb
import numpy as np


class Data:
    def __init__(self, df, target_parameter, df_variables, nan_method="drop"):
        # firestore project source. change this during testing and host locally
        # self.project_source = "projects"
        self.project_source = "projects-production"

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
            self.processed_df, self.onehot_features = Data.make_onehot_df(self.processed_df)

            # now target contains the labels, and df contains the variables
            self.X_train, self.X_test, self.y_train, self.y_test = \
                self.make_train_test_split(
                    self.processed_df.to_numpy(), self.target.to_numpy())

    def nan_handler(self, df, method):
        # take care of nan values
        if method == "drop":
            return df.dropna()
        if method == "zeros":
            return df.fillna(0)
        if method == "mean":
            return df.fillna(df.mean())
        if method == "median":
            return df.fillna(df.median())
        raise ValueError("Invalid fill nan method")
    
    @staticmethod
    def make_onehot_df(df):
        categorical_features = {}
        for i, col in enumerate(list(df.columns)):
            unique_vals = df[col].unique()
            if len(unique_vals) / df[col].count() <= 0.05:
                categorical_features[col] = {"index": i, "values": unique_vals}
        for feature in list(categorical_features):
            unique_vals = categorical_features[feature]["values"]
            for uval in unique_vals:
                # assumes no col with name feature + str(uval)
                df[feature + str(uval)] = 1. * (df[feature] == uval)
        df = df.drop(list(categorical_features), axis=1)
        return df, categorical_features
    
    def get_onehot_dict(self):
        return self.onehot_features

    def make_train_test_split(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, random_state=0)
        return X_train, X_test, y_train, y_test

    def get_train_test_split(self):
        return self.X_train, self.X_test, self.y_train, self.y_test

    def count_NaN(self):
        '''
        REQUIRES: df some valid pandas dataframe
        ENSURES:  returns the number of NaN's in the entire dataframe 
        '''
        return int(self.df.isnull().sum().sum())

    def get_excluded_features(self):
        filteredColumns = self.df.dtypes[self.df.dtypes == np.object]
        listOfColumnNames = list(filteredColumns.index)
        excluded_columns = []
        for col in listOfColumnNames:
            if self.df[col].nunique() > 20:
                excluded_columns.append(col)
        return excluded_columns

    def get_info(self):
        '''
        REQUIRES: df some valid pandas dataframe
        ENSURES:  returns a dictionary containing varius info on a CSV
        '''
        info = {}
        info['NaN'] = self.count_NaN()
        info['excludedFeatures'] = self.get_excluded_features()
        return info

    def pre_describe(self, proj_id):
        '''
        ENSURES:  updates the proj_id firestore document to contain a field with info
        '''
        db = fb.firestore_init()
        info = self.get_info()
        project_ref = db.collection(self.project_source).document(proj_id)
        project_ref.update({"info": info})
        return info

    def get_information(self, input_variable):
        """
        Function to return descriptive stats to display on our sliders
        REQUIRES: df some valid pandas dataframe, input_variable a valid key
        ENSURES: a dictionary representation of descriptive stats
        """
        ref = self.df.describe()[input_variable]
        likely_continuous = 1. * \
            self.df[input_variable].nunique(
            )/self.df[input_variable].count() > 0.05
        info = {
            "name": input_variable,
            "lo": ref[3],
            "hi": ref[7],
            "q1": ref[4],
            "q2": ref[5],
            "q3": ref[6],
            "continuous": True if likely_continuous else False,
        }

        if not info["continuous"]:
            info["isString"] = True if self.df[input_variable].dtype == np.object else False
            if info["isString"]:
                info["values"] = list(self.df[input_variable].unique())

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

        project_ref = db.collection(self.project_source).document(proj_id)
        project_ref.update({"variables": self.get_variables(self.df_vars_str),
                            "models": self.get_model_obj(model_list), "targetParam": self.target_str})

    @staticmethod
    def from_csv(uid, proj_id, csv_name):
        bucket = fb.bucket_init()
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
            models[m.type] = {"accuracy": m.get_accuracy(
                self.X_test, self.y_test)}
        return models
