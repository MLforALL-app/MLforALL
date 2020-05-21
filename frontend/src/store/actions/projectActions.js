export const createProject = (project) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const fname = getState().firebase.profile.firstName;
		const lname = getState().firebase.profile.lastName;
		const uid = getState().firebase.auth.uid;
		const date = new Date();
		// Will need some way to accomplish this
		const csvName = "dummy.csv";
		firestore
			.collection("projects")
			.add({
				...project,
				authorFirstName: fname,
				authorLastName: lname,
				authorID: uid,
				createdAt: date,
				csvName: csvName,
				models: [],
				variables: {}
			})
			.then((snapshot) => {
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
