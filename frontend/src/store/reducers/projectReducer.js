const initState = {
	curUserProjID: "init",
	curUserProj: "init",
	csvLoaded: false
};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			//console.log("Created project", action.project, action.snapshot);
			//console.log(state);
			return {
				...state,
				curUserProjID: action.snapshot["id"],
				curUserProj: action.project
			};
		case "CREATE_PROJECT_ERROR":
			//console.log("Create project error", action.error);
			return state;
		case "DELETE_PROJECT_DOC":
			//console.log("Deleted project in firestore document");
			return state;
		case "DELETE_PROJECT_DOC_ERROR":
			//console.log("Delete project error document", action.error);
			return state;
		case "DELETE_PROJECT_STORE":
			//console.log("Deleted project in storage");
			return state;
		case "DELETE_PROJECT_STORE_ERROR":
			//console.log("Delete project error storage", action.error);
			return state;
		case "UPLOAD_CSV":
			//console.log("Uploaded CSV");
			return { ...state, csvLoaded: true };
		case "UPLOAD_CSV_ERROR":
			//console.log("Upload CSV error");
			return state;
		case "UPDATE_CSV_NAME":
			return state;
		case "UPDATE_CSV_NAME_ERROR":
			return state;
		default:
			//console.log("Default case");
			return state;
	}
};

export default projectReducer;
