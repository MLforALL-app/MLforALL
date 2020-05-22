import pandas as pd
import firebase as fb


def get_information(df, input_variable):
    ref = df.describe()[input_variable]
    info = {
        "name": input_variable,
        "lo": ref[3],
        "hi": ref[7],
        "q1": ref[4],
        "q2": ref[5],
        "q3": ref[6]
    }
    return info


def get_variables(df, input_list):
    variables = []
    for inp in input_list:
        variables.append(get_information(df, inp))
    return variables


def send_vars(df, db, proj_id, input_list):
    project_ref = db.collection("projects").document(proj_id)
    project_ref.update({"variables": get_variables(df, input_list)})
    return None
