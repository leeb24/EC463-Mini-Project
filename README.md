# EC463-Mini-Project

### Description
The goal of this mini project is to build an application that requires logging in, and received and plot sampled temperature and humidity from a sensor. However, because this project focus on software, its no need to develop the sensor but but just simulate it.

### Language and Application

The backend of the project is written in node.js, and the frontend of the project is written in Html. The project is a website application. To build all the features, firebase, mlab, mongoDB and plotly are used. The website is listened in the localhost:3000.
```
Localhost: 3000
```
### Login Page
When a user opens this website, the user will see the page below. The user can register by typing the username and password. The password must be longer than 6 characters, otherwise, a notice of "The password must be 6 characters long or more." shows. Besides, if the user register by a existing username, a notice of The email address is already in use by another account." will show. After the user signup by a combination of applicable username and password, the information will be stored in firebase. The user can then signin after the website is closed. 
![Alt text](images/Login.png?raw=true "Login Page")
### Home Page
After the user signs in or signup, the user enters the homepage. There are four buttons rooms, three to choose from different rooms considering that the user is supposed to access multiple sources of temperature and humidity, and one last button to signout back to Login Page. Because the temperature and humidity datas are simulated, they are generated randomly and stored in mongodb and uploaded to mLab. 
![Alt text](images/Homepage.png?raw=true "Home Page")

### Plot Page
After the user chooses any of the room, the user enters the plotpage. humidity and temperature for the room choosed by the user are plotted by the help of Plotly. The data are extracted from mLab, by the identity and the room number the user chooses. The user can zoom in/out or click to show humidiity or temperature seperately, or go back to homepage by click the homepage button. 
![Alt text](images/Plot.png?raw=true "Plot Page")
