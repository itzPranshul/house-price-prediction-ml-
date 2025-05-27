import sys
import json
import joblib
import numpy as np

model = joblib.load('model.pkl')

def predict(features):
    features = np.array(features).reshape(1, -1)
    pred = model.predict(features)
    return pred[0]

if __name__ == "__main__":
    input_json = sys.argv[1]
    data = json.loads(input_json)
    features = data["features"]
    prediction = predict(features)
    print(prediction)
