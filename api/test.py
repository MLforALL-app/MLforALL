import json
import requests


def get_data():

    url = "http://eliteorigin.pythonanywhere.com/predict"
    response = requests.get(url)

    if response.status_code == 200:
        return json.loads(response.content.decode('utf-8'))
    else:
        return None


print(get_data())
