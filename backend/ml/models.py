import joblib
import pandas as pd
from datetime import datetime

RESEARCH_PATH = 'ml/research/'


class SeasonalDemandClassifier:

    def __init__(self):
        self.prophet = dict()
        self.prophet['CLOTHING'] = joblib.load(
            RESEARCH_PATH + 'prophet_clothing.joblib')
        self.prophet['FURNITURE'] = joblib.load(
            RESEARCH_PATH + 'prophet_furniture.joblib')
        self.prophet['ELECTRONIC'] = joblib.load(
            RESEARCH_PATH + 'prophet_electronic.joblib')

    def predict(self, category: str):
        p = None
        try:
            p = self.prophet[category.upper()]
        except Exception as e:
            print("Invalid category", str(e))
            return None

        future = p.make_future_dataframe(1, freq='MS')
        forecast = p.predict(
            future)[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
        return forecast

    def predict_today(self, category: str):
        forecast = self.predict(category)
        month = datetime.now().month
        year = datetime.now().year
        row = forecast.loc[forecast['ds'] == f"{year}-01-{month}"]
        return {
            "date": f"01-{month}-{year}",
            "category": category,
            "min": round(row['yhat_lower'].values[0]),
            "max": round(row['yhat_upper'].values[0]),
            "avg": round(row['yhat'].values[0])
        }
