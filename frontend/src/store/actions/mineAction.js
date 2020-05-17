const getProject = (firestore) => {
	return (projID) => {
		return firestore
			.collection("projects")
			.doc(projID)
			.get()
			.then((doc) => {
				return doc.data();
			})
			.catch((err) => {
				console.log("error with project firestore", err);
			});
	};
};

const getMyList = (uid, firestore) => {
	return firestore
		.collection("users")
		.doc(uid)
		.get()
		.then((doc) => {
			return doc.data().projects;
		})
		.catch((err) => {
			console.log("Error with user firestore", err);
		});
};

const fetchMine = (uid, firestore) => {
	const myproj = getMyList(uid, firestore); // list of project id's
	return myproj.map(getProject(firestore));
};

export const fetchMine = (auth) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const myproj = getMyList(uid, firestore); // list of project id's
	return myproj.map(getProject(firestore));
			.then((snapshot) => {
				// Add projectID to user
				appendProjectToUser(snapshot.id, firestore, authorID);
				dispatch({ type: "CREATE_PROJECT", project });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PROJECT_ERROR", err });
			});
	};
};

/*

Note to self from youtube comment

Joel Greek
1 year ago
You probably figured this out already since you wrote this 4 months ago but maybe someone else who watches this video now will ask the same question:
One could probably do this in the firestore cloud I guess. (Lesson 32), if you set the 'allow read, write: if request.auth.uid != userId'
Not sure if this is best practice, (probably not), but it works. cheers!

*/
