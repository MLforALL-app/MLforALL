import React, { Component } from "react";
import { connect } from "react-redux";
import Papa from "papaparse";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import "firebase/storage";
import firebase from "../../../config/fbConfig";
import axios from "axios";

const nameMapper = (name) => {
	switch (name) {
		case "":
			return "Nothing Selected Yet";
		case "log_reg":
			return "Logistic Regression";
		case "gnb":
			return "Gauss Naive Bayes";
		case "knn":
			return "K-Nearest Neighbors";
		case "svm":
			return "Support Vector Machine";
		case "clf":
			return "Decision Tree Classifier";
		case "lda":
			return "Linear Discriminant Analysis";
		default:
			return "Error: Not valid model name";
	}
};

class DisplayCSV extends Component {
	state = {
		csvArray: [],
		models: this.initObj(["log_reg", "knn", "clf", "gnb", "svm", "lda"]),
		inputs: {},
		output: ""
	};
	// Our flip boolean object data structure thing functions
	filterObj = (objState) => {
		return Object.entries(objState)
			.filter(([key, val]) => val)
			.map(([key, val]) => key);
	};
	initObj = (objList) => {
		var objState = {};
		objList.forEach((item) => {
			objState[item] = false;
		});
		return objState;
	};
	// Handlers for things on the page
	handleHeaderClick = ({ columnData, dataKey, event }) => {
		this.setState((prevState) => {
			var newInputs = prevState.inputs;
			newInputs[dataKey] = !newInputs[dataKey];
			return { ...prevState, inputs: newInputs };
		});
	};
	handleDropdown = (event) => {
		this.setState({ output: event.target.value });
	};
	// get functions to populate things on page
	getMenuItems = (headers) => {
		var menuitems = [];
		headers.forEach((h) => {
			menuitems.push(
				<MenuItem key={h} value={h}>
					{h}
				</MenuItem>
			);
		});
		return menuitems;
	};
	getColumns = (keyList) => {
		var columns = [];
		keyList.forEach((key) => {
			columns.push(
				<Column label={key} dataKey={key} key={key} width={900} />
			);
		});
		return columns;
	};
	// BIG PAPA
	bigPapa = (url) => {
		Papa.parse(url, {
			download: true,
			worker: true,
			header: true,
			complete: (results) => {
				this.setState({
					csvArray: results.data
				});
				const inputState = this.initInputs(
					Object.keys(results.data[0])
				);
				this.setState({
					inputs: inputState
				});
				console.log("All done!", results);
			}
		});
	};
	// initialize the CSV in firebase storage and then big papa it
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
				console.log("This the url", url);
				this.bigPapa(url); // populates the csvArray state
			})
			.catch((err) => {
				console.log("SOMETHING wrong uhOh", err);
			});
	};
	// handle submitting the project
	handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submit event", e);
		console.log("INPUT INFO:");
		console.log("UID", this.props.auth.uid);
		console.log("PROJID", this.props.projID);
		console.log("PROJTITLE", this.props.curUserProj.title);
		console.log("MODELS CHOSEN", this.state.models);
		console.log("OUTPUT PARAM", this.state.output);
		console.log("INPUT PARAMS", this.filterInputs(this.props.inputs));
		console.log("CSV NAME", this.props.curUserProj.csvName);
		const path = {
			uid: this.props.auth.uid,
			projectID: this.props.projID,
			title: this.props.curUserProj.title,
			modelList: this.state.models,
			targetParameter: this.state.output,
			dfVariables: this.filterInputs(this.props.inputs),
			csvName: this.props.curUserProj.csvName
		};
		axios
			.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/store`, path)
			.then((res) => {
				console.log("THIS IS RESULT", res);
				console.log("Successfully created project models?");
			})
			.catch((err) => {
				console.log("THIS IS AN ERROR", err);
			});
	};
	componentDidMount = () => {
		this.initCSV();
	};
	render() {
		return (
			<div>
				{this.state.csvArray.length === 0 ? (
					<CircularProgress />
				) : (
					<div>
						<h5>
							{" "}
							This project will take{" "}
							<span style={{ color: "blue" }}>
								{this.filterInputs(this.state.inputs)}
							</span>{" "}
							to attempt to predict{" "}
							<span style={{ color: "red" }}>
								{this.state.output}
							</span>
						</h5>
						<FormControl>
							<Select
								value={this.state.output}
								onChange={this.handleDropdown}
								displayEmpty
							>
								{this.getMenuItems(
									Object.keys(this.state.csvArray[0])
								)}
							</Select>
							<FormHelperText>Output Parameter</FormHelperText>
						</FormControl>
						<Table
							width={900}
							height={400}
							headerHeight={30}
							rowHeight={25}
							onHeaderClick={this.handleHeaderClick}
							rowCount={this.state.csvArray.length}
							rowGetter={({ index }) =>
								this.state.csvArray[index]
							}
						>
							{this.getColumns(
								Object.keys(this.state.csvArray[0])
							)}
						</Table>
					</div>
				)}
			</div>
		);
	}
}

const mapStatetoProps = (state) => {
	// console.log("LOOK AT ME", state);
	return {
		auth: state.firebase.auth,
		curUserProj: state.project.curUserProj
	};
};

export default connect(mapStatetoProps)(DisplayCSV);
