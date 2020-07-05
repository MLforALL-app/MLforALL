const initState = {
	curUserProjID: "init",
	csvLoaded: false,
	cWPFull: false,
	currentWorkingProject: "initialized",
	csvUrl: "",
	csvHolding: {},
	modelBuilt: false,
	dataBuilt: false

};


const atLeastOneTrue = (boolObj) => {
	for (var key in boolObj) {
		//if (!boolObj.hasOwnProperty(key)) continue;
		if (boolObj[key] === true) {
			return true;
		}
	}
	return false;
};

const checkFull = (currentWorkingProject) => {
	if (currentWorkingProject === "initialized") {
		return false;
	} else {
		//check output
		if (currentWorkingProject.targetParameter === "") {
			return false;
		}
		//check that there is at least one model
		if (!atLeastOneTrue(currentWorkingProject.modelList)) {
			return false;
		}
		//check that there is at least one input
		if (!atLeastOneTrue(currentWorkingProject.inputs)) {
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
		case "QUICK_CSV":
			return { ...state, csvHolding: action.csv };
		case "UPLOAD_CSV":
			return state;
		case "UPLOAD_CSV_ERROR":
			return state;
		case "UPLOAD_CSV_METADATA":
			return { ...state, csvLoaded: true };
		case "UPLOAD_CSV_METADATA_ERROR":
			return state;
		case "UPDATE_CSV_NAME":
			return state;
		case "UPDATE_CSV_NAME_ERROR":
			return state;
		case "UPDATE_CONTENT":
			return { ...state, dataBuilt: true };
		case "UPDATE_CONTENT_ERROR":
			return state;
		case "SET_CURRENT_WORKING_PROJECT":
			return {
				...state,
				cWPFull: false,
				modelBuilt: false,
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
						svm: false,
						lda: false
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
			cwp = {
				...state.currentWorkingProject,
				modelList: action.data
			};
			return {
				...state,
				cWPFull: checkFull(cwp),
				currentWorkingProject: cwp
			};
		case "CSV_DATA_IN_STORE":
			return {
				...state,
				csvData: action.data
			};
		case "CSV_FETCH_ERROR":
			return state;
		case "UPDATE_TP":
			cwp = {
				...state.currentWorkingProject,
				targetParameter: action.data
			};
			return {
				...state,
				cWPFull: checkFull(cwp),
				currentWorkingProject: cwp
			};
		case "UPDATE_INPUTS":
			cwp = {
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
				modelBuilt: true
			};
		case "CREATE_MODEL_FAIL":
			return state;
		case "RESET_BUILD":
			return {
				...state,
				modelBuilt: false,
				dataBuilt: false,
				currentWorkingProject: "initialized"
			};
		case "CLEAR_STORE":
			return initState;
		case "UPDATE_CHECK":
			cwp = state.currentWorkingProject;
			return {
				...state,
				cWPFull: checkFull(cwp),
				currentWorkingProject: cwp
			};
		default:
			return state;
	}
};

export default projectReducer;
