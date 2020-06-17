const initState = {
	curUserProjID: "init",
	csvLoaded: false,
	currentWorkingProject: "initialized",
	csvUrl: ""
};

const initObj = (objList) => {
	var objState = {};
	objList.forEach((item) => {
		objState[item] = false;
	});
	return objState;
};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			return {
				...state,
				curUserProjID: action.snapshot["id"]
			};
		case "CREATE_PROJECT_ERROR":
			return state;
		case "DELETE_PROJECT_DOC":
			return state;
		case "DELETE_PROJECT_DOC_ERROR":
			return state;
		case "DELETE_PROJECT_STORE":
			return state;
		case "DELETE_PROJECT_STORE_ERROR":
			return state;
		case "UPLOAD_CSV":
			return { ...state, csvLoaded: true };
		case "UPLOAD_CSV_ERROR":
			return state;
		case "UPLOAD_CSV_METADATA":
			return state;
		case "UPLOAD_CSV_METADATA_ERROR":
			return state;
		case "UPDATE_CSV_NAME":
			return state;
		case "UPDATE_CSV_NAME_ERROR":
			return state;
		case "UPDATE_CONTENT":
			return state;
		case "UPDATE_CONTENT_ERROR":
			return state;
		case "SET_CURRENT_WORKING_PROJECT":
			return {
				...state,
				currentWorkingProject : {
					uid : action.uid,
					projId : action.pid,
					title : action.project.title,
					csvName : action.project.csvName,
					nanMethod : "drop",
					targetParameter : "",
					modelList : {
						log_reg : false,
						knn: false, 
						clf: false, 
						gnb: false, 
						svm: false,
					},
					inputs: {}
				}
			};
		case "UPDATE_NAN":
			console.log(action.data); 
			return {
				...state,
				currentWorkingProject : {
					...state.currentWorkingProject,
					nanMethod : action.data 
				}
			};
		case "UPDATE_ML":
			return {
				...state,
				currentWorkingProject : {
					...state.currentWorkingProject,
					modelList : action.data 
				}
			};
		case "CSV_DATA_IN_STORE":
			return {
				...state, 
				csvData: action.data,
				currentWorkingProject : {
					...state.currentWorkingProject,
					inputs : initObj(Object.keys(action.data[0]))
				}
			};
		case "CSV_FETCH_ERROR":
			return state;
		case "UPDATE_TP":
			return {
				...state, 
				currentWorkingProject : {
					...state.currentWorkingProject,
					targetParameter : action.data 
				}
			};
		case "UPDATE_INPUTS":
			console.log(action.data);
			return {
				...state,
				currentWorkingProject : {
					...state.currentWorkingProject,
					inputs : action.data
				}
			};

		default:
			return state;
	}
};

export default projectReducer;
