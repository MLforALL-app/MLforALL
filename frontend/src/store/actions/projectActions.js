export const createProject = (project) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		firestore
			.collection("projects")
			.add({
				title: project.title,
				content: project.content,
				authorFirstName: "Davis",
				authorLastName: "Wojo",
				authorID: "12345",
				createdAt: new Date()
			})
			.then(() => {
				// tehn do this
				dispatch({ type: "CREATE_PROJECT", project });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PROJECT_ERROR", err });
			});
	};
};
