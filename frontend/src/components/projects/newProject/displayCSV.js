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
import ModelCheck from "./modelcheck";

class DisplayCSV extends Component {
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
	// State
	state = {
		csvArray: [],
		models: this.initObj(["log_reg", "knn", "clf", "gnb", "svm", "lda"]),
		inputs: {},
		output: ""
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
	handleModelToggle = (value) => () => {
		console.log("VALUE IN HANDLE TOGGLE", value);
		this.setState((prevState) => {
			var newModels = prevState.models;
			newModels[value] = !newModels[value];
			return { ...prevState, models: newModels };
		});
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
				const inputState = this.initObj(Object.keys(results.data[0]));
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
		const path = {
			uid: this.props.auth.uid,
			projectID: this.props.projID,
			title: this.props.curUserProj.title,
			modelList: this.filterObj(this.state.models),
			targetParameter: this.state.output,
			dfVariables: this.filterObj(this.state.inputs),
			csvName: this.props.curUserProj.csvName
		};
		axios
			/*.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/store`, path)*/
			.post(`http://0.0.0.0:8080/store`, path)
			.then((res) => {
				console.log("THIS IS RESULT", res);
				console.log("Successfully created project models?");
			})
			.catch((err) => {
				console.log("THIS IS AN ERROR", err);
			});
		// TODO UPDATE FIREBASE FIELD FOR MODELS
	};
	componentDidMount = () => {
		this.initCSV();
		console.log(
			"INITILA OBJ",
			this.initObj(["log_reg", "knn", "clf", "gnb", "svm", "lda"])
		);
	};
	render() {
		return (
			<div className="displaycsv">
				{this.state.csvArray.length === 0 ? (
					<CircularProgress />
				) : (
					<div className="isactive">
						<div className="row">
							<h5>
								{" "}
								This project will take{" "}
								<span style={{ color: "blue" }}>
									{this.filterObj(this.state.inputs)}
								</span>{" "}
								to attempt to predict{" "}
								<span style={{ color: "red" }}>
									{this.state.output}
								</span>
							</h5>
							<div className="col s8">
								{console.log(
									"THIS IS MODELS",
									this.state.models
								)}
								<ModelCheck
									filterObj={this.filterObj}
									handleToggle={this.handleModelToggle}
									models={this.state.models}
								/>
							</div>
							<div className="col s4">
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
									<FormHelperText>
										Output Parameter
									</FormHelperText>
								</FormControl>
								<button
									onClick={this.handleSubmit}
									className="btn blue lighten-1 z-depth-0"
								>
									Build the model!
								</button>
							</div>
						</div>
						<div className="row">
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
		curUserProj: state.project.curUserProj,
		projID: state.project.curUserProjID
	};
};

export default connect(mapStatetoProps)(DisplayCSV);
