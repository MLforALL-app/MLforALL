# Needed for Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
# Needed to process data
import pandas as pd
import numpy as np
import pickle
from io import StringIO


def bucket_init():
    if not firebase_admin._apps:
        cred = credentials.Certificate('mlforall-admin-sdk.json')
        firebase_admin.initialize_app(cred, {
            'storageBucket': 'mlforall-14bf7.appspot.com'
        })
    return storage.bucket()


def make_path(uid, project_title, file_name):
    return uid + "/" + project_title + "/" + file_name


def get_csv(bucket, source_blob_name):

    blob = bucket.blob(source_blob_name)
    csv_bytes = blob.download_as_string()
    s = str(csv_bytes, 'utf-8')
    data = StringIO(s)

    return pd.read_csv(data)


def send_pickle(bucket, pickle_bytes, pickle_path):

    blob = bucket.blob(pickle_path)
    blob.upload_from_string(pickle_bytes)


def get_pickle(bucket, pickle_path):

    blob = bucket.blob(pickle_path)
    pickle_bytes = blob.download_as_string()

    return pickle.loads(pickle_bytes)
