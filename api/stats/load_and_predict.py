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

def floatCast(num):
    return float(num)

def load_and_predict(model_filename, prediction_variables):
    loaded_model = pickle.load(open(model_filename, 'rb'))
    X_predict = [list(map(floatCast, prediction_variables))]
    guess = loaded_model.predict(X_predict)
    print(guess[0])
    return guess

def testlp():
    #contingent on creating the model created in testing build and pickle 
    model = 'ldasimple_top50.sav';
    variables = [142, 21, 38, -12, 15, 70, 1235]
    guess = load_and_predict(model, variables)

if __name__ == '__main__':
    testlp()