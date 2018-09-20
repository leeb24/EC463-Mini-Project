# EC463-Mini-Project

### Description
The goal of this mini project is to build an application that requires logging in,receives and plot sampled temperature and humidity from a sensor. However, because this project focus on software, its no need to develop the sensor but but just simulate it.

### Language and Application

The backend of the project is written in node.js, and the frontend of the project is written in Html(Along with HTML and several other view engines) . The project is a website application. To build all the features, firebase, mlab, mongoDB and plotly are used. The web application is set to run on port 3000 in the local machine. 
```
Localhost: 3000
```
### Login Page
When a user opens this website, the user will see the page below. The user can register by typing the username and password. The password must be longer than 6 characters, otherwise, a notice of "The password must be 6 characters long or more." shows. Besides, if the user register by a existing username, a notice of The email address is already in use by another account." will show. After the user signup by a combination of applicable username and password, the information will be stored in firebase Authentication API. The user can then signin after the website is closed. <br />
All the authentication process starts from the login page, when the user signs in via firebase Auth, the server issues a unique token to the client using the cookie cache. The client(user) use this token to access private routes within the website 
.(jsonwebtoken module) Token verification is done using the cookieverify middleware which only lets the user proceed when the token is valid.

![Alt text](Images/Login.png?raw=true "Login Page")
### Home Page
After the user signs in or signup, the user enters the homepage. There are four buttons consisting of three rooms,  considering that the user is supposed to access multiple sources of temperature and humidity. The last button is to signout back to Login Page. Because the temperature and humidity datas are simulated, they are generated randomly and stored in mongodb and uploaded to mLab. 
![Alt text](Images/Homepage.png?raw=true "Home Page")

### Plot Page
After the user chooses any of the rooms, the user enters the plotpage. humidity and temperature for the room choosed by the user are plotted by the help of Plotly. The data are extracted from mLab, by the identity(email) and the room number the user chooses. The user can zoom in/out or click to show humidiity or temperature seperately, or go back to homepage by click the homepage button. <br />
All the used model for temperature and humidity are within the "model" folder.
![Alt text](Images/Plot.png?raw=true "Plot Page")

### Contributions
Byoungsul Lee: Authentication, Routing(General Backend), Plotting (27 Commits) <br />
Qian Zhang: Object Modeling, Database, Testing  (32 Commits) <br />
Both: Front-End Design

### References
[https://gist.github.com/aerrity/fd393e5511106420fba0c9602cc05d35] <br />
[https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/] <br />

### Project Diagram

![Alt text](Images/diagram.png?raw=true "Diagram")
