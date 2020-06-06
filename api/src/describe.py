import pandas as pd


def count_NaN(df):
    '''
    REQUIRES: df some valid pandas dataframe
    ENSURES:  returns the number of NaN's in the entire dataframe 
    '''
    return int(df.isnull().sum().sum())


def get_info(df):
    '''
    REQUIRES: df some valid pandas dataframe
    ENSURES:  returns a dictionary containing varius info on a CSV
    '''
    info = {}
    info['NaN'] = count_NaN(df)
    return info


def pre_describe(db, df, proj_id):
    '''
    REQUIRES: df some valid dataframe
    ENSURES:  updates the proj_id firestore document to contain a field with info
    '''
    info = get_info(df)
    project_ref = db.collection("projects").document(proj_id)
    project_ref.update({"info": info})
    return info
