# -*- coding: utf-8 -*-
"""
Created on Sat May 23 17:43:09 2020

@author: Adjecti-1
"""
# importing libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# importing the dataset
dataset = pd.read_csv('Position_Salaries.csv')
X = dataset.iloc[:, 1:-1].values # iloc indecates locate indexes
y = dataset.iloc[:, -1].values
y = y.reshape(len(y), 1)

# training the model
from sklearn.tree import DecisionTreeRegressor
regressor = DecisionTreeRegressor(random_state = 0)
regressor.fit(X, y)

# predicting new value
y_pred = regressor.predict([[6.5]])
print("Prediction on X = 6.5 : ",y_pred[0])

# Visualizing the data in Higher Resolution
X_grid = np.arange(min(X), max(X), 0.1)
X_grid = X_grid.reshape(len(X_grid), 1)
plt.scatter(X, y, color='red')
plt.plot(X_grid, regressor.predict(X_grid), color='blue')
plt.title("Truth or Bluff")
plt.xlabel("Position levels")
plt.ylabel("Salary")
