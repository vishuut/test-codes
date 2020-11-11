import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

# importing the dataset
dataset = pd.read_csv('Position_Salaries.csv')
X = dataset.iloc[:, 1:-1].values # iloc indecates locate indexes
y = dataset.iloc[:, -1].values

# Building the Linear regression model
lin_reg = LinearRegression()
lin_reg.fit(X, y)

# Building the Polynomial Regression model
poly_reg = PolynomialFeatures(degree=4)
X_poly = poly_reg.fit_transform(X)
lin_reg_2 = LinearRegression()
lin_reg_2.fit(X_poly, y)

# Visualizing the Linear Regression results
# plt.scatter(X, y, color='red')
# plt.plot(X, lin_reg.predict(X), color='blue')
# plt.title('Truth & Bluff (Linear Regression)')
# plt.xlabel('Position Level')
# plt.ylabel('Salary')
# plt.show()

# Visualizing the Polynomial Regression results
plt.scatter(X, y, color='red')
plt.plot(X, lin_reg_2.predict(X_poly), color='blue')
plt.title('Truth & Bluff (Polynomial Regression)')
plt.xlabel('Position Level')
plt.ylabel('Salary')
plt.show()

# Predicting new results with Linear Regression
# pred_val = lin_reg.predict([[6.5]])
# print(pred_val)

# Predicting new results with Polynomial Regression
# pred_val = lin_reg_2.predict(poly_reg.fit_transform([[6.5]]))
# print(pred_val)
