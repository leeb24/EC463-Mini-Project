# EC463-Mini-Project


###    The goal of this mini project is to build an application that requires logging in, and received and plot sampled temperature and humidity from a sensor. However, because this project focus on software, its no need to develop the sensor but but just simulate it.
####    The backend of the project is written in node.js, and the frontend of the project is written in Html. The project is a website application. To build all the features, firebase, mlab, mongoDB and plotly are used.
###   The website is listened in the local. When a user opens this website, the user will see the page below. The user can register by typing the username and password. The password must be longer than 6 characters, otherwise, a notice of "The password must be 6 characters long or more." shows. Besides, if the user register by a existing username, a notice of The email address is already in use by another account." will show. After the user signup by a combination of applicable username and password, the information will be stored in firebase. The user can then signin after the website is closed. 
###    After the user signs in or signup, there will be three rooms, considering that the user is supposed to access multiple sources of temperature and humidity. 
