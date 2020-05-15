export const createProject = (project) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to database

		// tehn do this
		dispatch({ type: "CREATE_PROJECT", project });
	};
};
