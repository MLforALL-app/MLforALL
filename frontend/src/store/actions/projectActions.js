import axios from "axios";
import apiHost from "../../config/api";
import projectSource from "../../config/collection";
import Papa from "papaparse";

export const createProject = (project) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const fname = getState().firebase.profile.firstName;
    const lname = getState().firebase.profile.lastName;
    const uid = getState().firebase.auth.uid;
    firestore
      .collection(projectSource)
      .add({
        ...project,
        authorFirstName: fname,
        authorLastName: lname,
        authorID: uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        csvName: "",
        imgName: "",
        targetParam: "",
        content: "",
        csvPath: "",
        example: false,
        models: {},
        variables: [],
        info: {},
        imgRef: "",
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
      .collection(projectSource)
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
      case "update_check":
        dispatch({ type: "UPDATE_CHECK" });
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
    },
  });
};

export const parseExisting = (file, dispatch) => {
  Papa.parse(file, {
    worker: true,
    header: true,
    complete: (results) => {
      const data = results.data;
      dispatch({ type: "CSV_DATA_IN_STORE", data });
    },
  });
};
/* Reduxifying The Papa Parse and Fetch CSV  to Decouple them from the component*/
export const initCSV = (project, projID) => {
  return (dispatch, getState, { getFirebase }) => {
    const csvPath = project.csvPath;
    const firebase = getFirebase();
    var csvRef = firebase.storage().ref(csvPath);
    csvRef
      .getDownloadURL()
      .then((url) => {
        bigPapa(url, dispatch);
      })
      .catch((err) => {
        dispatch({ type: "CSV_FETCH_ERROR" });
      });
  };
};
//in cases where we just uploaded the csv, use that instead of fetching
export const setUpPreloadedCsv = () => {
  return (dispatch, getState, { getFirebase }) => {
    const csv = getState().project.csvHolding;
    parseExisting(csv, dispatch);
  };
};

//Helper function to determine if path is Example
const pathIsExample = (csvPath) => {
  return "Examples" === csvPath.split("/")[0];
};

export const deleteMLProject = (pid, uid, project, update) => {
  //update is a true or false
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    // case on whether the path is in Examples using pathIsExample
    // get to delete files
    const delCSV = project.csvPath.split("/").pop();
    // might be a source of bugs in the future
    // Grabs the "keys" names of the models and places it in an array
    var delVars = Object.keys(project.models);
    // Only scenario in which you delete is if it's not an update and a custom set
    if (!update && !pathIsExample(project.csvPath)) {
      delVars.push(delCSV);
    }
    //adding uploaded picture to list
    if (!update && project.imgName !== "") {
      delVars.push(project.imgName);
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
          dispatch({ type: "DELETE_PROJECT_STORE_ERROR" });
        });
    });
    if (!update) {
      const firestore = getFirestore();
      firestore
        .collection(projectSource)
        .doc(pid)
        .delete()
        .then((snapshot) => {
          dispatch({ type: "DELETE_PROJECT_DOC" });
        })
        .catch((err) => {
          dispatch({ type: "DELETE_PROJECT_DOC_ERROR", err });
        });
    }
  };
};
//extras for handle csv

const filterObj = (objState) => {
  return Object.entries(objState)
    .filter(([key, val]) => val)
    .map(([key, val]) => key);
};

//passed in projects as an input from editprojects to acquire the "csvPath"
export const buildModels = (project) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const submissionData = getState().project.currentWorkingProject;
    const path = {
      uid: submissionData.uid,
      projId: submissionData.projId,
      title: submissionData.title,
      modelList: filterObj(submissionData.modelList),
      targetParameter: submissionData.targetParameter,
      dfVariables: filterObj(submissionData.inputs),
      csvPath: project.csvPath,
      nanMethod: submissionData.nanMethod,
    };
    axios
      .post(`${apiHost}/store`, path)
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

const initializeDescribe = (csvPath, pid, dispatch) => {
  const postInput = {
    csvPath: csvPath,
    projId: pid,
  };
  // After we upload the csv, update firestore with preliminary insights
  axios
    .post(`${apiHost}/describe`, postInput)
    .then((res) => {
      console.log(res);
      dispatch({ type: "UPLOAD_CSV_METADATA" });
    })
    .catch((err) => {
      dispatch({ type: "UPLOAD_CSV_METADATA_ERROR" });
    });
};

/* 
- this function generalizes uploadCSVtoStorage and updateCSVData
but now allows for us to account for example datasets

- csv is a file object

- example is a string representing the name of the file in the example folder 
that was passed from then handler in guidinginfo

- pid is the project id

- example dataset would have a null csv and a nonempty example string
- non example dataset would have the opposite kinda like XOR
*/

export const initializeCSVForProject = (csv, example, pid) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch({ type: "QUICK_CSV", csv });
    const firebase = getFirebase();
    const uid = getState().firebase.auth.uid;

    console.log("csv: ", csv);
    const isExample = !csv && example !== "";
    const csvPath = isExample
      ? `Examples/${example}`
      : `${uid}/${pid}/${csv.name}`;
    var csvRef = firebase.storage().ref(csvPath);
    if (!isExample) {
      console.log("New CSV");
      csvRef
        .put(csv)
        .then((snapshot) => {
          console.log("snapshot", snapshot);
          dispatch({ type: "UPLOAD_CSV" });
          initializeDescribe(csvPath, pid, dispatch);
        })
        .catch((err) => {
          console.log("UploadToCSV Error", err);
          dispatch({ type: "UPLOAD_CSV_ERROR" });
        });
    } else {
      initializeDescribe(csvPath, pid, dispatch);
    }
    // will need to get rid of csvName in the future
    const firestore = getFirestore();
    const projectRef = firestore.collection(projectSource).doc(pid);
    projectRef
      .set({ csvPath: csvPath, example: isExample }, { merge: true })
      .then((snapshot) => {
        dispatch({ type: "UPDATE_CSV_NAME" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_CSV_NAME_ERROR", err });
      });
  };
};

// This function initializes an image for a project; if one already
// exists, then it deletes that one from storage
export const initializeIMGForProject = (img, project, pid) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase();
    const uid = getState().firebase.auth.uid;
    const imgPath = `${uid}/${pid}/${img.name}`;
    var imgRef = firebase.storage().ref(imgPath);

    //deleting previous picture
    if (project.imgName !== "") {
      const storageRef = getFirebase().storage();
      storageRef
        .ref(`${uid}/${pid}/${project.imgName}`)
        .delete()
        .then(() => {
          dispatch({ type: "DELETE_PROJECT_STORE" });
        })
        .catch((err) => {
          dispatch({ type: "DELETE_PROJECT_STORE_ERROR" });
        });
    }

    imgRef
      .put(img)
      .then((snapshot) => {
        console.log("First");
        const firestore = getFirestore();
        const projectRef = firestore.collection(projectSource).doc(pid);
        imgRef.getDownloadURL().then((url) => {
          console.log("inside get download url");
          projectRef
            .set({ imgRef: url, imgName: img.name }, { merge: true })
            .then((snapshot) => {
              dispatch({ type: "UPDATE_IMG_NAME" });
            })
            .catch((err) => {
              console.log("Error", err);
              dispatch({ type: "UPDATE_IMG_NAME_ERROR", err });
            });
        });
        dispatch({ type: "UPLOAD_IMG" });
      })
      .catch((err) => {
        console.log("UploadIMG Error", err);
        dispatch({ type: "UPLOAD_IMG_ERROR" });
      });
  };
};
