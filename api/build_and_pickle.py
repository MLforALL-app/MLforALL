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


def build_and_pickle(target_parameter, df_variables, csv_name, debug=False):
    assert(type(target_parameter) == str)
    assert(type(df_variables) == list)
    assert(len(df_variables) > 0)  # must have parameters
    assert(type(csv_name) == str)
    df = pd.read_csv(csv_name)
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
    logreg = build_logistic_regression(X_train, y_train)
    tree = build_decision_tree(X_train, y_train)
    knn = build_knn(X_train, y_train)
    lda = build_lda(X_train, y_train)
    gnb = build_gnb(X_train, y_train)
    svc = build_SVC(X_train, y_train)
    files_created = []
    logregfile = 'log_reg_' + csv_name[0:-4] + '.sav'
    files_created.append(logregfile)
    pickle.dump(logreg, open(logregfile, 'wb'))
    treefile = 'tree_' + csv_name[0:-4] + '.sav'
    files_created.append(treefile)
    pickle.dump(logreg, open(treefile, 'wb'))
    knnfile = 'knn_' + csv_name[0:-4] + '.sav'
    files_created.append(knnfile)
    pickle.dump(knn, open(knnfile, 'wb'))
    ldafile = 'lda_' + csv_name[0:-4] + '.sav'
    files_created.append(ldafile)
    pickle.dump(lda, open(ldafile, 'wb'))
    gnbfile = 'gnb_' + csv_name[0:-4] + '.sav'
    files_created.append(gnbfile)
    pickle.dump(gnb, open(gnbfile, 'wb'))
    svcfile = 'svc_' + csv_name[0:-4] + '.sav'
    files_created.append(svcfile)
    pickle.dump(svc, open(svcfile, 'wb'))
    score = {}
    for mdl in files_created:
        score[mdl] = get_score(mdl, X_test, y_test)
    return [files_created, score]


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


def get_score(filename, x, y):
    loaded_model = pickle.load(open(filename, 'rb'))
    result = loaded_model.score(x, y)
    print(result)
    return result


def runtests():
    # this test function relies on the top50 csv being in the same folder.
    csv = 'simple_top50.csv'
    target = 'Genre'
    variables = ['Beats.Per.Minute', 'Energy', 'Danceability',
                 'Loudness..dB..', 'Liveness', 'Valence.', 'Length.']
    files = build_and_pickle(target, variables, csv, debug=True)


if __name__ == '__main__':
    runtests()
