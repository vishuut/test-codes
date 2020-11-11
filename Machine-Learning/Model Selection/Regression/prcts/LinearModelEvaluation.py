# -*- coding: utf-8 -*-
"""
Created on Sun May 24 15:53:35 2020

@author: Adjecti-1
"""

# import numpy as np
# import matplotlib.pyplot as plt
import pandas as pd

# importing the dataset
dataset = pd.read_csv('Data.csv')
X = dataset.iloc[:, :-1].values # iloc indecates locate indexes
y = dataset.iloc[:, -1].values

# Splitting data-set in training and testing data
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

# Building and Training the Multiple Linear Regressor
from sklearn.linear_model import LinearRegression
linear_regressor = LinearRegression()
linear_regressor.fit(X_train, y_train)
y_pred = linear_regressor.predict(X_test)

# Evaluating the Performance of Linear Regressor
from sklearn.metrics import r2_score
score = r2_score(y_test, y_pred)
print(score)
