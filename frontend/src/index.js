import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import "firebase/storage";
import {
	reduxFirestore,
	getFirestore,
	createFirestoreInstance
} from "redux-firestore";
import {
	ReactReduxFirebaseProvider,
	getFirebase,
	isLoaded
} from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";
//import cute from "./images/loadingcute.gif";

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reduxFirestore(firebase, fbConfig)
	)
);

const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true
};

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
	presence: "presence",
	sessions: "sessions"
};

// Update this to update loading screen
function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth))
		return (
			<div style={{ textAlign: "center" }}>
				<h6>Loading MLforAll...</h6>
				{/*<img src={cute}></img>
				<p>
					{" "}
					We appreciate your patience! Zesty Machine Learning Models
					are on their way. </p> */}
			</div>
		);
	return children;
}

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<AuthIsLoaded>
				<App />
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
