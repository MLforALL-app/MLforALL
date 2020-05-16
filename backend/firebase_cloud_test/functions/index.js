const functions = require("firebase-functions");
const admin = require("firebase-admin");

const firebaseConfig = {
	apiKey: "AIzaSyAg8kj2_QhVBk4oEC7xFboYutd89ET5XuI",
	authDomain: "mlforall-14bf7.firebaseapp.com",
	databaseURL: "https://mlforall-14bf7.firebaseio.com",
	projectId: "mlforall-14bf7",
	storageBucket: "mlforall-14bf7.appspot.com",
	messagingSenderId: "309886373117",
	appId: "1:309886373117:web:e1eb1799479e7f66cc0294",
	measurementId: "G-G9JR6TGE7Y"
};

admin.initializeApp(firebaseConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send(
		"Hello Len, Davis, from Firebase! It's boutta be a movie up in this joint"
	);
});

exports.getPickles = functions.https.onRequest((request, response) => {
	admin
		.firestore()
		.collection("pickles")
		.get()
		.then((data) => {
			let pickles = [];
			data.forEach((doc) => {
				pickles.push(doc.data());
			});
			return response.json(pickles);
		})
		.catch((err) => console.error(err));
});

// This doesnt work
exports.createPickle = functions.https.onRequest((req, res) => {
	const newPickle = {
		username: req.body.username,
		type: req.body.type,
		bucket: req.body.bucket,
		createdAt: admin.firestore.Timestamp.fromDate(new Date())
	};

	admin
		.firestore()
		.collection("pickles")
		.add(newPickle)
		.then((doc) => {
			res.json({ message: `document ${doc.id} created! good job homie` });
		})
		.catch((err) => {
			res.status(500).json({ error: "You done messed up brodie" });
			console.log(err);
		});
});
