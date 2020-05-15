const initState = {};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			console.log("Created project", action.project);
			return state;
		case "CREATE_PROJECT_ERROR":
			console.log("Create project error", action.error);
			return state;
		default:
			console.log("Default case");
			return state;
	}
};

export default projectReducer;
