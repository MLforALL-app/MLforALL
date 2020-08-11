# React Components

Here is a brief rundown on our various react components. Hopefully this can provide greater context for the site as a whole.

### `src/components...`

- #### Authentication: the `.../auth/...` Folder
  - `form.js` is a generalized component containing the main signup form
  - `join.js` is the component that displays styles and content for the main signup page
  - `resetPass.js` allows for users to reset their passwords
  - `verify.js` ensures users confirm their emails before using MLforALL
- #### Dashboards/Profiles: `.../dashboard/...` Folder
  - `dashboard.js` is the "Explore" page
  - `myprojects.js` is the "My Models" page
  - `notifications.js` is the live notifications component _(NOT IN USE)_
  - `sortform.js` is a component used in sorting cards
  - `userProfile.js` has the same effect as `myprojects.js` but allows viewing of other users
- #### Educational Content: `.../education/...`
  - `docs/{model_name}` contains info about `model_name`
  - `docs/fileFormatter.js` contains generalized functions to render markdown and LaTeX.
  - `mainDoc.js` main file compiling information from above.
  - `makeToolBar.js` generalized component to create documentation-style help page.
- #### Guiding Info: `.../info/...`
  - `about.js` is the "About Page" containing info about team members, project goals, and more.
  - `footer.js` is for the footer _(NOT IN USE)_
  - `ghpages.js` serves to redirect for our experimental deployment
  - `landing.js` is the "Landing Page" showcasing features of the platform
  - `lost.js` is our display page for accessing nonexistent paths
  - `mobile.js` is a temporary display page for disabling mobile usage
- #### Website Layout: `.../layouts/...`
  - `Navbar.js` navigation bar to display links depending on user
  - `Signedinlinks.js` links shown to user when signed in
  - `Signedoutlinks.js` links show to user when signed out
  - `helpbox.js` reusable component for help boxes
  - `scrollToTop.js` quick function to prevent website from loading mid-page

### `src/store...`

- #### Dispatched functions: `.../actions/...`

  - `authActions.js` functions related to user authentication
  - `nameMapper.js` function to map names
  - `projectActions.js`

- #### Reducers: `.../reducers/...`
  - `authReducer.js`
  - `projectReducer.js`
  - `rootReducer.js`

### `src/styling...`

- various CSS files for styling the website
