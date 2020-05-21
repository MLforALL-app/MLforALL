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


def build_logistic_regression(X, y):
    logreg = LogisticRegression()
    logreg.fit(X, y)
    return logreg


def build_decision_tree(X, y):
    return DecisionTreeClassifier().fit(X, y)


def build_knn(X, y):
    return KNeighborsClassifier().fit(X, y)


def build_lda(X, y):
    return LinearDiscriminantAnalysis().fit(X, y)


def build_gnb(X, y):
    return GaussianNB().fit(X, y)


def build_SVC(X, y):
    return SVC().fit(X, y)


def build_and_pickle(df, target_parameter, df_variables, pickle_name, debug=False):
    target = df[target_parameter]
    col_name_list = list(df.columns)

    for col in df_variables:
        if col in col_name_list:
            col_name_list.remove(col)

    df.drop(col_name_list, axis=1, inplace=True)
    # now target contains the labels, and df contains the variables
    X = df
    y = target
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
    scaler = MinMaxScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    # models
    if (pickle_name == "log_reg"):
        return pickle.dumps(build_logistic_regression(X_train, y_train))
    elif (pickle_name == "clf"):
        return pickle.dumps(build_decision_tree(X_train, y_train))
    elif (pickle_name == "knn"):
        return pickle.dumps(build_knn(X_train, y_train))
    elif (pickle_name == "lda"):
        return pickle.dumps(build_lda(X_train, y_train))
    elif (pickle_name == "gnb"):
        return pickle.dumps(build_gnb(X_train, y_train))
    elif (pickle_name == "svm"):
        return pickle.dumps(build_SVC(X_train, y_train))
    else:
        raise TypeError
