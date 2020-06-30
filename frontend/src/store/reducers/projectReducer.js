const initState = {
	curUserProjID: "init",
	csvLoaded: false,
	cWPFull : false,
	currentWorkingProject: "initialized",
	csvUrl: "",
	built: false,
};

const initObj = (objList) => {
	var objState = {};
	objList.forEach((item) => {
		objState[item] = false;
	});
	return objState;
};

const atLeastOneTrue =  (boolObj) => {
	let hasTrue = false;
	for(const key in boolObj){
		if(boolObj[key] === true){
			hasTrue = true;
			break;
		}
	}
	return hasTrue;
}; 

const checkFull = (currentWorkingProject) => {
	if (currentWorkingProject === "initialized"){
		return false;
	}else{
		//check output
		if(currentWorkingProject.targetParameter === ""){
			console.log("block1");
			return false;
		}
		//check that there is at least one input
		if(!atLeastOneTrue(currentWorkingProject.inputs)){
			console.log("block2");
			return false;
		}
		//check that there is at least one model
		if(!atLeastOneTrue(currentWorkingProject.modelList)){
			console.log("block3");
			return false;
		}
		return true;
	}
	
};

const projectReducer = (state = initState, action) => {
	let cwp = {};
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
				built: false,
				cWPFull : false,
				currentWorkingProject: {
					uid: action.uid,
					projId: action.pid,
					title: action.project.title,
					csvName: action.project.csvName,
					nanMethod: "drop",
					targetParameter: "",
					modelList: {
						log_reg: false,
						knn: false,
						clf: false,
						gnb: false,
						svm: false
					},
					inputs: {},
					content: ""
				}
			};
		case "UPDATE_NAN":
			return {
				...state,
				currentWorkingProject: {
					...state.currentWorkingProject,
					nanMethod: action.data
				}
			};
		case "UPDATE_ML":
			cwp =  {
				...state.currentWorkingProject,
				modelList: action.data
			};
			console.log(cwp);
			return {
				...state,
				cWPFull: checkFull(cwp),
				currentWorkingProject: cwp
			};
		case "CSV_DATA_IN_STORE":
			return {
				...state,
				csvData: action.data,
				currentWorkingProject: {
					...state.currentWorkingProject,
					inputs: initObj(Object.keys(action.data[0]))
				}
			};
		case "CSV_FETCH_ERROR":
			return state;
		case "UPDATE_TP":
			cwp =  {
				...state.currentWorkingProject,
				targetParameter: action.data
			};
			return {
				...state,
				cWPFull: checkFull(cwp),
				currentWorkingProject: cwp
			};
		case "UPDATE_INPUTS":
			cwp =  {
				...state.currentWorkingProject,
				inputs: action.data
			};
			return {
				...state,
				cWPFull: checkFull(cwp),
				currentWorkingProject: cwp
			};
		case "CREATE_MODEL_SUCC":
			return {
				...state,
				built: true
			};
		case "CREATE_MODEL_FAIL":
			return state;
		case "RESET_BUILD":
			return {
				...state,
				built: false,
				currentWorkingProject: "initialized"
			};
		case "CLEAR_STORE":
			return initState;
		default:
			return state;
	}
};

export default projectReducer;
