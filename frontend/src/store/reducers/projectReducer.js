const initState = {};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			console.log("Created project", action.project);
			return state;
		case "CREATE_PROJECT_ERROR":
			console.log("Create project error", action.error);
			return state;
		case "DELETE_PROJECT_DOC":
			console.log("Deleted project in firestore document");
			return state;
		case "DELETE_PROJECT_DOC_ERROR":
			console.log("Delete project error document", action.error);
			return state;
		case "DELETE_PROJECT_STORE":
			console.log("Deleted project in storage");
			return state;
		case "DELETE_PROJECT_STORE_ERROR":
			console.log("Delete project error storage", action.error);
			return state;
		default:
			console.log("Default case");
			return state;
	}
};

export default projectReducer;
