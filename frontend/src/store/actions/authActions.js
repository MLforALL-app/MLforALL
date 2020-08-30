export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGN_OUT_SUCCESS" });
        console.log("bye bye!");
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const authRef = getFirebase().auth();
    authRef
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((response) => {
        dispatch({ type: "SIGNUP_SUCCESS" });
        // Send verification link
        authRef.currentUser
          .sendEmailVerification()
          .then(() => {
            dispatch({ type: "SEND_VERIFY" });
          })
          .catch((error) => {
            console.log("Verification email error", error);
            dispatch({ type: "SEND_VERIFY_ERROR" });
          });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const updateUserInfo = (uid, newUser) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userRef = firestore.collection("users");
    userRef
      .doc(uid)
      .set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
        timeJoined: firestore.FieldValue.serverTimestamp(),
      })
      .then((response) => {
        dispatch({ type: "UPDATE_USER_INFO" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_USER_INFO_ERROR", err });
        console.log(err);
      });
  };
};

export const sendVerify = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        dispatch({ type: "SEND_VERIFY" });
      })
      .catch((error) => {
        console.log("Verification email error", error);
        dispatch({ type: "SEND_VERIFY_ERROR" });
      });
  };
};

export const resetPass = (email) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({ type: "SEND_RESET" });
      })
      .catch((error) => {
        console.log("Reset email error", error);
        dispatch({ type: "SEND_RESET_ERROR" });
      });
  };
};
