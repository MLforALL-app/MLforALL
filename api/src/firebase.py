# Needed for Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
# from firebase_admin import firestore
# Needed to process data
import pandas as pd
# import numpy as np
import pickle
from io import StringIO


def bucket_init():
    # initialize reference to Google Cloud Storage bucket
    # avoid initializing app twice
    if not firebase_admin._apps:
        cred = credentials.Certificate('mlforall-admin-sdk.json')
        firebase_admin.initialize_app(cred, {
            'storageBucket': 'mlforall-14bf7.appspot.com'
        })
    return storage.bucket()


def make_path(uid, project_title, file_name):
    # make path for Firebase Storage to reference something
    return uid + "/" + project_title + "/" + file_name


def get_csv(bucket, source_blob_name):
    """
    REQUIRES: bucket a valid client side reference to storage bucket
              source_blob_name a valid path to an existing CSV file
    ENSURES: returns pandas dataframe representing that CSV 
    """
    blob = bucket.blob(source_blob_name)
    csv_bytes = blob.download_as_string()
    s = str(csv_bytes, 'utf-8')
    data = StringIO(s)

    return pd.read_csv(data)


def send_pickle(bucket, pickle_bytes, pickle_path):
    """
    REQUIRES: bucket a valid client side reference to storage bucket
              pickle_bytes a byte representation of a model 
              pickle_path a valid path in Firebase storage where we want to 
              store the model
    ENSURES: Byte representation of our model is loaded into storage
    """
    blob = bucket.blob(pickle_path)
    blob.upload_from_string(pickle_bytes)


def get_pickle(bucket, pickle_path):
    """
    REQUIRES: bucket a valid client side reference to storage bucket
              pickle_path a valid path in Firebase storage with an 
              existing byte representation of a model
    ENSURES: Returns a loaded model that can be interacted with in python
    """
    blob = bucket.blob(pickle_path)
    pickle_bytes = blob.download_as_string()

    return pickle.loads(pickle_bytes)
