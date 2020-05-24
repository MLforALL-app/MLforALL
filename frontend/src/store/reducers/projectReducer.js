const initState = {};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			console.log("Created project", action.project);
			return state;
		case "CREATE_PROJECT_ERROR":
			console.log("Create project error", action.error);
			return state;
		case "DELETE_PROJECT":
			console.log("Deleted project");
			return state;
		case "DELETE_PROJECT_ERROR":
			console.log("Delete project error", action.error);
			return state;
		case "UPLOAD_CSV":
			console.log("Uploaded CSV");
			return state;
		case "UPLOAD_CSV_ERROR":
			console.log("Upload CSV error");
		default:
			console.log("Default case");
			return state;
	}
};

export default projectReducer;
