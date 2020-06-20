# React Components
Here is a brief rundown on our various react components. Hopefully this can provide greater context for the site as a whole. 

### `src/components...`

-   #### Authentication: the `.../auth/...` Folder
    -   `Signin.js` is the sign in page for our website
    -   `Signup.js` is the component on the landing page for signing up
    -   `resetPass.js` allows for users to reset their passwords
    -   `verify.js` ensures users confirm their emails before using MLforALL.
-   #### Dashboards/Profiles: `.../dashboard/...` Folder
    -   `dashboard.js` is the "Explore" page
    -   `myprojects.js` is the "My Models" page
    -   `notifications.js` is the live notificatins component _(NOT IN USE)_
    -   `sortform.js` is a component used in sorting cards
    -   `userProfile.js` has the same effect as `myprojects.js` but allows viewing of other users
-   #### Educational Content: `.../education/...`
    -   (TODO)
-   #### Guiding Info: `.../info/...`
    -   `footer.js` is for the footer _(NOT IN USE)_
    -   `ghpages.js` serves to redirect for our experimental deployment
    -   `joeLand.js` is the main landing page
    -   `landing.js` is the old landing page that needs to get deleted lol
    -   `lost.js` is our display page for accessing nonexistent paths
    -   `mobile.js` is a temporary display page for disabling mobile usage
-   #### Website Layout: `.../layouts/...`
    -   `Navbar.js` navigation bar to display links depending on user
    -   `Signedinlinks.js` links shown to user when signed in
    -   `Signedoutlinks.js` links show to user when signed out
    -   `helpbox.js` reusable component for helpboxes
    -   `scrollToTop.js` quick function to prevent website from loading mid-page

### `src/pictures...`
- Joseph Kim is a legend

### `src/store...`
- INSERT REDUX INFORMATION

### `src/styling...`
- various CSS files for styling the website
