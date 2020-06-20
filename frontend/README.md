# MLforALL Front End

The `/frontend` folder is the main **app** folder for our website made using **React**, **Redux**, and **Firebase**.

### Create-React-App and Redux

[Create React App](https://github.com/facebook/create-react-app) serves as the frontend for this project. A major thanks to [Net Ninja's Tutorials](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3) for teaching us many important basics as well. We have many components and hopefully can provide a brief high-level overview of key components below.

##### REFER TO THE [`/src`](https://github.com/lenghuang/MLforAll/tree/master/frontend/src) folder for more info

### Firebase

[Google Firebase](https://firebase.google.com/) serves as our backend for this project. We utilize it for cloud storage, user authentication, hosting, as well as a NoSQL database.

#### Relevant Files

-   `.firebaserc` used to configure FirebaseCLI
-   `firebase.json` used to configure Firebase Hosting for our website
-   `functions/index.js` contains cloud functions that dynamically listens for events occuring in our backend
