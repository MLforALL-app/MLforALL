# MLforALL Front End

The `/frontend` folder is the main **app** folder for our website made using **React**, **Redux**, and **Firebase**.

### Create-React-App

[Create React App](https://github.com/facebook/create-react-app) serves as the frontend for this project. A major thanks to [Net Ninja's Tutorials](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3) for teaching us many important basics as well. We have many components and hopefully can provide a brief high-level overview of key components below.

#### `src/components...` Folder

-   ##### Authentication: the `.../auth/...` Folder
    -   `Signin.js` is the sign in page for our website
    -   `Signup.js` is the component on the landing page for signing up
    -   `resetPass.js` allows for users to reset their passwords
    -   `verify.js` ensures users confirm their emails before using MLforALL.
-   ##### Dashboards/Profiles: `.../dashboard/...` Folder
    -   `dashboard.js` is the "Explore" page
    -   `myprojects.js` is the "My Models" page
    -   `notifications.js` is the live notificatins component _(NOT IN USE)_
    -   `sortform.js` is a component used in sorting cards
    -   `userProfile.js` has the same effect as `myprojects.js` but allows viewing of other users
-   ##### Educational Content: `.../education/...`
    -   (TODO)
-   ##### Guiding Info: `.../info/...`
    -   `footer.js` is for the footer _(NOT IN USE)_
    -   `ghpages.js` serves to redirect for our experimental deployment
    -   `joeLand.js` is the main landing page
    -   `landing.js` is the old landing page that needs to get deleted lol
    -   `lost.js` is our display page for accessing nonexistent paths
    -   `mobile.js` is a temporary display page for disabling mobile usage
-   ##### Website Layout: `.../layouts/...`
    -   `Navbar.js` navigation bar to display links depending on user
    -   `Signedinlinks.js` links shown to user when signed in
    -   `Signedoutlinks.js` links show to user when signed out
    -   `helpbox.js` reusable component for helpboxes
    -   `scrollToTop.js` quick function to prevent website from loading mid-page

### Redux Info

-   insert redux info here

##### `src/store...` Folder

### Firebase

[Google Firebase](https://firebase.google.com/) serves as our backend for this project. We utilize it for cloud storage, user authentication, hosting, as well as a NoSQL database.

#### Relevant Files

-   `.firebaserc` used to configure FirebaseCLI
-   `firebase.json` used to configure Firebase Hosting for our website
-   `functions/index.js` contains cloud functions that dynamically listens for events occuring in our backend
