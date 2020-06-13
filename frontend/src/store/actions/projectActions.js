import axios from "axios";

export const createProject = (project) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const fname = getState().firebase.profile.firstName;
		const lname = getState().firebase.profile.lastName;
		const uid = getState().firebase.auth.uid;
		const date = new Date();
		// We get the csv name from the csv project (called csvName for conveinence)
		//const csvName = project.csvName.name;
		//Store the file to upload for later
		//project["csvName"] = csvName;
		firestore
			.collection("projects")
			.add({
				...project,
				authorFirstName: fname,
				authorLastName: lname,
				authorID: uid,
				createdAt: date,
				csvName: "",
				targetParam: "",
				content: "",
				models: [],
				variables: [],
				info: {}
			})
			.then((snapshot) => {
				//console.log(snapshot);
				dispatch({ type: "CREATE_PROJECT", project, snapshot });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PROJECT_ERROR", err });
			});
	};
};

export const updateContent = (content, pid) => {
	return (dispatch, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		firestore
			.collection("projects")
			.doc(pid)
			.set({ content: content }, { merge: true })
			.then((snapshot) => {
				//console.log(snapshot);
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
		console.log("IN ACTION", project); 
		console.log(uid);
		console.log(pid);
		dispatch({type : "SET_CURRENT_WORKING_PROJECT", project, pid, uid});
	};
}

export const updateCurrentWorkingProject = (param, data) => {
	return (dispatch) => {
		console.log(param);
		switch (param){
			case "nanMethod" :
				dispatch({type : "UPDATE_NAN", param, data});
				break;
			case "modelList" :
				dispatch({type : "UPDATE_ML", param, data});
				break;
		}
		
	};
};

export const uploadCSVtoStorage = (csv, project, pid) => {
	return (dispatch, getState, { getFirebase }) => {
		//console.log(csvName);
		const firebase = getFirebase();
		const uid = getState().firebase.auth.uid;
		const csvPath = uid + "/" + pid + "/" + csv.name;
		var csvRef = firebase.storage().ref(csvPath);
		csvRef
			.put(csv)
			.then((snapshot) => {
				//console.log("uploaded csv!");
				dispatch({ type: "UPLOAD_CSV" });
				const path = {
					uid: uid,
					projId: pid,
					csvName: csv.name
				};
				// After we upload the csv, update firestore with preliminary insights
				axios
					.post(
						`https://flask-api-aomh7gr2xq-ue.a.run.app/describe`,
						path
					)
					.then((res) => {
						dispatch({ type: "UPLOAD_CSV_METADATA" });
					})
					.catch((err) => {
						dispatch({ type: "UPLOAD_CSV_METADATA_ERROR" });
					});
			})
			.catch((err) => {
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
				dispatch({type : "UPDATE_CURRENT_WORKING_PROJECT", project, pid, uid});
			})
			.catch((err) => {
				dispatch({ type: "UPDATE_CSV_NAME_ERROR", err });
			});
	};
};

export const deleteMLProject = (pid, uid, project) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		// get todelete files
		const delCSV = project.csvName;
		//console.log("DEL CSV", delCSV);
		// might be a source of bugs in the future
		var delVars = Object.values(project.models);
		//console.log("TYPE OF DEL VARS", typeof delVars);
		delVars.push(delCSV);
		//console.log("TO DELETE", delVars);
		// make async call to database
		const firestore = getFirestore();
		//console.log("STORAGE PATH", auth.uid + "/" + project.title);
		firestore
			.collection("projects")
			.doc(pid)
			.delete()
			.then((snapshot) => {
				dispatch({ type: "DELETE_PROJECT_DOC" });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_PROJECT_DOC_ERROR", err });
			});
		const storageRef = getFirebase().storage();
		delVars.forEach((filename) => {
			storageRef
				.ref(`${uid}/${pid}/${filename}`)
				.delete()
				.then(() => {
					dispatch({ type: "DELETE_PROJECT_STORE" });
				})
				.catch((err) => {
					dispatch({ type: "DELETE_PROJECT_STORE_ERROR" });
				});
		});
	};
};
