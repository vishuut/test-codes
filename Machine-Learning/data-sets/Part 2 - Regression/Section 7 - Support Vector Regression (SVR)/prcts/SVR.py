# -*- coding: utf-8 -*-
"""
Created on Sat May 23 12:53:38 2020

@author: Adjecti-1
"""

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# importing the dataset
dataset = pd.read_csv('Position_Salaries.csv')
X = dataset.iloc[:, 1:-1].values # iloc indecates locate indexes
y = dataset.iloc[:, -1].values

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X = sc_X.fit_transform(X)
sc_y = StandardScaler()
y = y.reshape(len(y), 1)
y = sc_y.fit_transform(y)

# Creating and Training the regressor
from sklearn.svm import SVR
regressor = SVR(kernel='rbf')
regressor.fit(X, y)
y_pred = sc_y.inverse_transform(regressor.predict(sc_X.transform([[6.5]])))

# Visualizing the data
plt.scatter(sc_X.inverse_transform(X), sc_y.inverse_transform(y), color="red")
plt.plot(sc_X.inverse_transform(X), sc_y.inverse_transform(regressor.predict(X)), color="blue")
plt.xlabel("Position Levels")
plt.ylabel("Salary")
plt.title("Truth or Bluf")
plt.show()
