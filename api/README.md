# MLforALL Specific RestAPI

This folder contains most code used to create, train, and display machine learning models to our website. Using popular python data science libraries and Google Cloud hosting, we are able to turn this Python code into a callable function for our frontend. 

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
- `/local_stats/` directory containing our intial code when first learning how to create models locally
- `app.py` main file using Flask to host our API. Routes various requests to other python functions
- `build.py` builds our Machine Learning Models
- `describe.py` generates descriptive statistics about datasets as they are uploaded
- `firebase.py` contains useful helper functions 
- `predict.py` loads built models and makes predictions
- `variables.py` loads descriptive stats about a project's input variables
- `visual.py` is a work in progress
