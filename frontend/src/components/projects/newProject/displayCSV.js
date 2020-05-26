import React, { Component } from "react";
import { connect } from "react-redux";
import Papa from "papaparse";
import "firebase/storage";
import firebase from "../../../config/fbConfig";

class DisplayCSV extends Component {
	state = {
		parsedCsv: ""
	};
	componentDidMount = () => {
		console.log(this.props.csv);
		this.initCSV();
	};

	initCSV = () => {
		const csvPath =
			this.props.auth.uid +
			"/" +
			this.props.curUserProj.title +
			"/" +
			this.props.curUserProj.csvName;
		var csvRef = firebase.storage().ref(csvPath);
		csvRef
			.getDownloadURL()
			.then((url) => {
				//PAPA PARSE
				console.log(url);
				console.log("CSV DISPLAY LOGGING ABOVE");
			})
			.catch(function (error) {
				// Handle any errors
			});
	};

	render() {
		return <div></div>;
	}
}

const mapStatetoProps = (state) => {
	console.log("LOOK AT ME", state);
	return {
		auth: state.firebase.auth,
		curUserProj: state.project.curUserProj
	};
};

export default connect(mapStatetoProps)(DisplayCSV);

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://www.papaparse.com/docs
/* "Papa parse can take a DOM File object and return a 
    javascript object. Use this object then in react-virtualized 
    to create a table. Don’t know the specifics but you can select 
    a row based on the key name. Just need to ensure papa parse 
    converts to a convention similar to what react-virtualized 
    expects. Otherwise we’ll redo it. This is easily accomplished on 
    the create project page bc of the file object but idk How to do 
    this with API. Createproject takes priority though. " */
