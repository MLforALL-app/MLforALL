import pandas as pd
import firebase as fb


def get_information(df, input_variable):
    """
    Function to return descriptive stats to display on our sliders
    REQUIRES: df some valid pandas dataframe, input_variable a valid key
    ENSURES: a dictionary representation of descriptive stats
    """
    ref = df.describe()[input_variable]
    likely_continuous = 1.*df[input_variable].nunique()/df[input_variable].count() > 0.05
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


def get_variables(df, input_list):
    """
    Second order function to get descriptive stats for all variables
    REQUIRES: df some valid pandas dataframe, 
              input_list a valid list of all headers in the dataframe
    ENSURES: a list of dictionary representations of descriptive stats
    """
    variables = []
    for inp in input_list:
        variables.append(get_information(df, inp))
    return variables


def send_vars(df, db, proj_id, input_list, model_list, target_param):
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
    project_ref = db.collection("projects").document(proj_id)
    project_ref.update({"variables": get_variables(
        df, input_list), "models": model_list, "targetParam": target_param})
    return None
