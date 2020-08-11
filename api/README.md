# MLforALL Specific RestAPI

### Description

#### Rationale

MLforALL aims to make machine learning accessible to users through a web interface. To accomplish this, we will make API calls in our frontend website to execute this code. This code will not only abstract the syntax and semantics needed to use `sklearn` from the user, it will also communicate with our Firebase backend to interact (CRUD) with user data as necessary.

#### API Endpoints

- `/predict`: Assuming there is a valid pickled `sklearn` model in Google Cloud Storage, load that model predict the output given the user's input values from sliders.
- `/store`: Assuming there is a valid CSV file, take the user's input from the create page (input parameters, desired models, output parameter, nan_handling, etc), pass it into `sklearn`, and upload pickled models into Google Cloud Storage.
- `/describe`: Assuming there is a valid CSV file, load it into a `pandas` dataframe and do preliminary checks on it (ex: do NaN's exist).

### Tech Stack Overview

#### Machine Learning Model Creation

- Pandas
- sklearn

#### Flask RestAPI

- Creates models
- Communicates with Firebase Python SDK

#### Google Cloud

- API is hosted on Google Cloud
- `axios` to make calls to it from front-end

### Table of Contents `/src/...`

- `Dockerfile` used to initialize environment in Google Cloud (not in `/src`)
- `app.py` main file using Flask to host our API. Routes various requests to other python functions
- `data.py` takes care of a lot of data processing
