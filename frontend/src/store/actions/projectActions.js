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

export const uploadCSVtoStorage = (csv, project, id) => {
	return (dispatch, getState, { getFirebase }) => {
		//console.log(csvName);
		const firebase = getFirebase();
		const csvPath =
			getState().firebase.auth.uid + "/" + id + "/" + csv.name;
		var csvRef = firebase.storage().ref(csvPath);
		csvRef
			.put(csv)
			.then((snapshot) => {
				//console.log("uploaded csv!");
				dispatch({ type: "UPLOAD_CSV" });
			})
			.catch((err) => {
				dispatch({ type: "UPLOAD_CSV_ERROR" });
				//console.log("csv upload error");
			});
	};
};

export const updateCsvNameOnProject = (csv, project, id) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const projectRef = firestore.collection("projects").doc(id);
		projectRef
			.set(
				{
					csvName: csv.name
				},
				{ merge: true }
			)
			.then((snapshot) => {
				//console.log(snapshot);
				dispatch({ type: "UPDATE_CSV_NAME" });
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
				.ref(uid + "/" + pid + "/" + filename)
				.delete()
				.then(() => {
					//console.log("Delete correctly from storage");
				})
				.catch((err) => {
					//console.log("uh oh spagetthio", err);
				});
		});
	};
};
