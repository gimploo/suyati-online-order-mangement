import joblib
import pandas as pd
from datetime import datetime
import calendar

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

    def predict_an_entire_year(self):
        clothing = self.predict("clothing")
        furniture = self.predict("furniture")
        electronic = self.predict("electronic")

        year = datetime.now().year
        crows = clothing.loc[(clothing['ds'].dt.year ==
                             year) & (clothing['ds'].dt.month == 1)]
        frows = furniture.loc[(furniture['ds'].dt.year ==
                              year) & (furniture['ds'].dt.month == 1)]
        erows = electronic.loc[(electronic['ds'].dt.year ==
                                year) & (electronic['ds'].dt.month == 1)]

        clist = crows.values.tolist()
        elist = erows.values.tolist()
        flist = frows.values.tolist()

        output = list()
        for i in range(12):
            output.append({
                "name": calendar.month_name[i+1][0:3],
                "Clothing": round(clist[i][1]),
                "Furniture": round(flist[i][1]),
                "Electronic": round(elist[i][1]),
            })

        return output
