import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var fbConfig = {
	apiKey: "AIzaSyAg8kj2_QhVBk4oEC7xFboYutd89ET5XuI",
	authDomain: "mlforall-14bf7.firebaseapp.com",
	databaseURL: "https://mlforall-14bf7.firebaseio.com",
	projectId: "mlforall-14bf7",
	storageBucket: "mlforall-14bf7.appspot.com",
	messagingSenderId: "309886373117",
	appId: "1:309886373117:web:e1eb1799479e7f66cc0294",
	measurementId: "G-G9JR6TGE7Y"
};
// Initialize Firebase
firebase.initializeApp(fbConfig);
//firebase.analytics();
firebase.firestore();

export default firebase;
