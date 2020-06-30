import axios from "axios";
import Papa from "papaparse";

export const createProject = (project) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const fname = getState().firebase.profile.firstName;
		const lname = getState().firebase.profile.lastName;
		const uid = getState().firebase.auth.uid;
		firestore
			.collection("projects")
			.add({
				...project,
				authorFirstName: fname,
				authorLastName: lname,
				authorID: uid,
				createdAt: firestore.FieldValue.serverTimestamp(),
				csvName: "",
				targetParam: "",
				content: "",
				models: {},
				variables: [],
				info: {}
			})
			.then((snapshot) => {
				dispatch({ type: "CREATE_PROJECT", project, snapshot });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PROJECT_ERROR", err });
			});
	};
};

export const updateContent = (content, pid) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		firestore
			.collection("projects")
			.doc(pid)
			.set({ content: content }, { merge: true })
			.then((snapshot) => {
				dispatch({ type: "UPDATE_CONTENT" });
			})
			.catch((err) => {
				dispatch({ type: "UPDATE_CONTENT_ERROR" });
			});
	};
};

/* setWorkingProject will create a place in the redux state to hold the fields
 * for our build and pickle query. The intent is to move a lot of the code out
 * of editCSV and build the query by adding to this store.
 */
export const setWorkingProject = (project, pid) => {
	return (dispatch, getState) => {
		const uid = getState().firebase.auth.uid;
		dispatch({ type: "SET_CURRENT_WORKING_PROJECT", project, pid, uid });
	};
};

export const updateCurrentWorkingProject = (param, data) => {
	return (dispatch) => {
		switch (param) {
			case "nanMethod":
				dispatch({ type: "UPDATE_NAN", param, data });
				break;
			case "modelList":
				dispatch({ type: "UPDATE_ML", param, data });
				break;
			case "targetParameter":
				dispatch({ type: "UPDATE_TP", param, data });
				break;
			case "inputs":
				dispatch({ type: "UPDATE_INPUTS", param, data });
				break;
			default:
				dispatch({ type: "MALFORMED_CWP_REQ" });
		}
	};
};

export const bigPapa = (url, dispatch) => {
	Papa.parse(url, {
		download: true,
		worker: true,
		header: true,
		complete: (results) => {
			const data = results.data;
			dispatch({ type: "CSV_DATA_IN_STORE", data });
		}
	});
};

/* Reduxifying The Papa Parse and Fetch CSV  to Decouple them from the component*/
export const initCSV = (project, projID) => {
	return (dispatch, getState, { getFirebase }) => {
		const uid = getState().firebase.auth.uid;
		const csvPath = uid + "/" + projID + "/" + project.csvName;
		const firebase = getFirebase();
		var csvRef = firebase.storage().ref(csvPath);
		csvRef
			.getDownloadURL()
			.then((url) => {
				bigPapa(url, dispatch);
			})
			.catch((err) => {
				console.log("Init CSV Error", err);
				dispatch({ type: "CSV_FETCH_ERROR" });
			});
	};
};

export const uploadCSVtoStorage = (csv, project, pid) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const uid = getState().firebase.auth.uid;
		const csvPath = uid + "/" + pid + "/" + csv.name;
		var csvRef = firebase.storage().ref(csvPath);
		csvRef
			.put(csv)
			.then((snapshot) => {
				dispatch({ type: "UPLOAD_CSV" });
				const path = {
					uid: uid,
					projId: pid,
					csvName: csv.name
				};
				// After we upload the csv, update firestore with preliminary insights
				axios
					.post(`http://127.0.0.1:8080//describe`, path)
					.then((res) => {
						dispatch({ type: "UPLOAD_CSV_METADATA" });
					})
					.catch((err) => {
						dispatch({ type: "UPLOAD_CSV_METADATA_ERROR" });
					});
			})
			.catch((err) => {
				console.log("UploadToCSV Error", err);
				dispatch({ type: "UPLOAD_CSV_ERROR" });
			});
	};
};

export const updateCsvData = (csv, project, pid) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const uid = getState().firebase.auth.uid;
		const projectRef = firestore.collection("projects").doc(pid);
		projectRef
			.set({ csvName: csv.name }, { merge: true })
			.then((snapshot) => {
				dispatch({ type: "UPDATE_CSV_NAME" });
				dispatch({
					type: "UPDATE_CURRENT_WORKING_PROJECT",
					project,
					pid,
					uid
				});
			})
			.catch((err) => {
				dispatch({ type: "UPDATE_CSV_NAME_ERROR", err });
			});
	};
};

export const deleteMLProject = (pid, uid, project, update) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		// get todelete files
		const delCSV = project.csvName;
		// might be a source of bugs in the future
		var delVars = Object.keys(project.models);
		if (!update) {
			delVars.push(delCSV);
			const firestore = getFirestore();
			firestore
				.collection("projects")
				.doc(pid)
				.delete()
				.then((snapshot) => {
					dispatch({ type: "DELETE_PROJECT_DOC" });
				})
				.catch((err) => {
					console.log("Delete project Firestore error", err);
					dispatch({ type: "DELETE_PROJECT_DOC_ERROR", err });
				});
		}
		const storageRef = getFirebase().storage();
		delVars.forEach((filename) => {
			storageRef
				.ref(`${uid}/${pid}/${filename}`)
				.delete()
				.then(() => {
					dispatch({ type: "DELETE_PROJECT_STORE" });
				})
				.catch((err) => {
					console.log("Delete project Cloud Storage error", err);
					dispatch({ type: "DELETE_PROJECT_STORE_ERROR" });
				});
		});
	};
};
//extras for handle csv

const filterObj = (objState) => {
	return Object.entries(objState)
		.filter(([key, val]) => val)
		.map(([key, val]) => key);
};

export const buildModels = () => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		const submissionData = getState().project.currentWorkingProject;

		const path = {
			uid: submissionData.uid,
			projId: submissionData.projId,
			title: submissionData.title,
			modelList: filterObj(submissionData.modelList),
			targetParameter: submissionData.targetParameter,
			dfVariables: filterObj(submissionData.inputs),
			csvName: submissionData.csvName,
			nanMethod: submissionData.nanMethod
		};
		axios
			.post(`http://127.0.0.1:8080/store`, path)
			.then((res) => {
				dispatch({ type: "CREATE_MODEL_SUCC" });
			})
			.catch((err) => {
				console.log("THIS IS AN ERROR", err);
				dispatch({ type: "CREATE_MODEL_FAIL" });
			});
	};
};

export const resetBuild = () => {
	return (dispatch, getState, { getFirestore }) => {
		dispatch({ type: "RESET_BUILD" });
	};
};

export const clearStore = () => {
	return (dispatch, getState, { getFirestore }) => {
		dispatch({ type: "CLEAR_STORE" });
	};
};
