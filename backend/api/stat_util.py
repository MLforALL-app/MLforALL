import pandas as pd
import numpy as np 
from flask import jsonify


#one hot encoding
def one_hot(csv, cols, debug = False):
    assert(type(csv) == str)
    assert(type(cols) == list or type(cols) == str)
    if type(cols) != list:
        cols = [cols]
    #create the onehot vals
    df = pd.read_csv(csv)
    onehotdfs = []
    for col in cols:
       print(col)
       y = pd.get_dummies(df[col], prefix = col)
       df.drop(col, axis = 1, inplace = True)
       for col in y:
           df[col] = y[col]
    if debug:
        for col in df:
            print(col)
            print(df[col][0:5])
    df.to_csv('one_hot_' + csv)
    return 'one_hot_' + csv
#given a dataframe and a list of the categorical features, one hot encode them
#descriptive statistics 

#creates a list of pandas lists that contain the desired descriptive stats, 
#jsonify later
def get_descripive(csv, cols):
    assert(type(csv) == str)
    assert(type(cols) == list or type(cols) == str)
    if type(cols) != list:
        cols = [cols]
    df = pd.read_csv(csv)
    descriptive_list = {}
    for col in cols:
        stats = df[col].describe()
        descriptive_list[col] = stats
    return descriptive_list

        
def test_onehot():
    csv = 'Pokemon.csv'
    cols = ['Legendary', 'Generation']
    one_hot(csv, cols, debug = True)


def test_all():
    test_onehot()

if __name__ == '__main__':
    test_all()