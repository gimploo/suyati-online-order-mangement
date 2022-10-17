from api.models import CategoryStockHistory
from ml.models import SeasonalDemandClassifier
import pandas as pd
from prophet import Prophet


def run():

    ml = SeasonalDemandClassifier()

    # print("perdictiong")
    # print(ml.predict_today('clothing'))
    # print(ml.predict_today('furniture'))
    # print(ml.predict_today('electronic'))

    print(ml.predict_an_entire_year())
