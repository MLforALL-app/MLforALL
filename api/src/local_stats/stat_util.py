import pandas as pd
# import numpy as np
# from flask import jsonify
from sklearn.metrics import confusion_matrix

# one hot encoding


def one_hot(csv, cols, debug=False):
    # use isinstance(csv, str)
    # assert(type(csv) == str)
    # assert(type(cols) == list or type(cols) == str)
    # if type(cols) != list:
    #     cols = [cols]
    # create the onehot vals
    df = pd.read_csv(csv)
    for col in cols:
        print(col)
        y = pd.get_dummies(df[col], prefix=col)
        df.drop(col, axis=1, inplace=True)
        for col_y in y:
            df[col_y] = y[col_y]
    if debug:
        for col in df:
            print(col)
            print(df[col][0:5])
    df.to_csv('one_hot_' + csv)
    return 'one_hot_' + csv
# given a dataframe and a list of the categorical features, one hot encode them
# descriptive statistics

# creates a list of pandas lists that contain the desired descriptive stats,
# jsonify later


def get_descripive(csv, cols):
    # assert(type(csv) == str)
    # assert(type(cols) == list or type(cols) == str)
    # if type(cols) != list:
    #    cols = [cols]
    df = pd.read_csv(csv)
    descriptive_list = {}
    for col in cols:
        stats = df[col].describe()
        descriptive_list[col] = stats
    return descriptive_list

# this will either have to be added to our build and pickle, or we might have to tag our train and test set in the csv.


def get_confusion_matrix(model, df, X, y):
    # given a csv and a model lets see how it is classifything things
    predictions = []
    for col in X:
        predictions.append(model.predict(col))
    con_mat = confusion_matrix(y, predictions)
    # this is an array, I will have to create a representation later
    return con_mat


def test_onehot():
    csv = 'Pokemon.csv'
    cols = ['Legendary', 'Generation']
    one_hot(csv, cols, debug=True)


def test_all():
    test_onehot()


if __name__ == '__main__':
    test_all()
