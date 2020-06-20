# MLforALL Front End

The `/frontend` folder is the main **app** folder for our website that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

There are two different frameworks that are being used in this folder. **Firebase** and **ReactJS**

### Firebase

[Google Firebase](https://firebase.google.com/) serves as our backend for this project. We utilize it for cloud storage, user authentication, hosting, as well as a NoSQL database.

-   `.firebaserc` used to configure FirebaseCLI
-   `firebase.json` used to configure Firebase Hosting for our website
-   `functions/index.js` contains cloud functions that dynamically listens for events occuring in our backend

### Create-React-App

[Create React App](https://github.com/facebook/create-react-app) serves as the frontend for this project. We have many components and hopefully
