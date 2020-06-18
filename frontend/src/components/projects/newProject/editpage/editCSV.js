import React, { Component } from "react";
import { connect } from "react-redux";
import { Column, Table } from "react-virtualized";
import { Redirect } from "react-router-dom";
import "react-virtualized/styles.css"; // only needs to be imported once
// import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import "firebase/storage";
import { updateContent } from "../../../../store/actions/projectActions";
import HelpBox from "../../../layouts/helpbox";
import styles from "./build.css";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { updateCurrentWorkingProject } from "../../../../store/actions/projectActions";

const addSpace = (list) => {
	return list.map((s) => " " + s);
};

export const nameMapper = (name) => {
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
		redirect: false,
		loading: false,
		error: false,
		inputs: {}
	};
	// Handlers for things on the page
	handleHeaderClick = ({ columnData, dataKey, event }) => {
		console.log("SETTING INPUTS");
		this.setState((prevState) => {
			var newInputs = prevState.inputs;
			newInputs[dataKey] = !newInputs[dataKey];
			return { ...prevState, inputs: newInputs };
		});
		
		
	};
	handleDropdownOutput = (event) => {
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
	checkBoxChange = (colName) => (e) => {
		console.log(e.target.checked);
		console.log(colName);
		this.setState((prevState) => {
			var newInputs = prevState.inputs;
			newInputs[colName] = !newInputs[colName];
			return { ...prevState, inputs: newInputs };
		});
		console.log(this.props.inputs);
		console.log("SETTING INPUTS");
		this.props.setInputParameters(this.state.inputs);
	};
	checkBoxHeader = (colName) => (key) => {
		return (
			<div>
				<div>
				<FormControlLabel
					className="purple-text"
					value="bottom"
					control={<Checkbox color="primary" />}
					label=""
					labelPlacement="bottom"
					onChange={this.checkBoxChange(colName)}
				/>
				</div>
				<span
					className="ReactVirtualized__Table__headerTruncatedText purple-text"
					
				>
					{colName}
				</span>
			</div>
		);
	};

	getColumns = (keyList) => {
		var columns = [];
		keyList.forEach((key) => {
			console.log(key);
			let colName = key;
			columns.push(
				<Column
					label={key}
					dataKey={key}
					key={key}
					headerRenderer={this.checkBoxHeader(colName)}
					width={5000}
				/>
			);
		});
		return columns;
	};

	

	componentDidUpdate = () => {
		if(this.state.loading === true && this.props.inputs){
			this.setState({
				csvArray : this.props.csvData,
				inputs : this.props.inputs,
				loading : false
			});
			console.log(this.state.inputs);
		}

	}

	render() {
		return (
			<div className="displaycsv">
				{this.state.redirect ? (
					<Redirect to={"/project/" + this.props.id} />
				) : (
					<span></span>
				)}
				{(this.props.csvData && this.props.csvData.length) === 0 ? (
					<div className="container center">
						<CircularProgress />
					</div>
				) : (
					<div className="isactive">
						<div className="row container">
							<h5>
								<b>
									1. I want to consider these input
									parameters...{" "}
									<span className="pink-text">
										<HelpBox
											header="Click to Toggle Parameters"
											placement="right-end"
											desc="Here, you can click the headers to toggle on/off whether or not you want an input column to be considered by your model. Please note that you can choose columns containing ONLY NUMERICAL data."
										/>
									</span>
								</b>
							</h5>

							<Table
								width={1000}
								height={400}
								headerHeight={60}
								rowHeight={25}
								rowCount={this.props.csvData.length}
								rowGetter={({ index }) =>
									this.props.csvData[index]
								}
								rowClassName={({ index }) => {
									if (index < 0) {
										return styles.headerRow;
									} else {
										return index % 2 === 0
											? "evenRow"
											: "oddRow";
									}
								}}
							>
								{this.getColumns(
									Object.keys(this.props.csvData[0])
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
	return {
		auth: state.firebase.auth,
		csvData: state.project.csvData,
		inputs : state.project.currentWorkingProject && state.project.currentWorkingProject.inputs
	};
};
// Redux to associate action call to a dispatch
const mapDispatchToProps = (dispatch) => {
	return {
		updateContent: (content, pid) => dispatch(updateContent(content, pid)),
		setInputParameters : (inputs) => dispatch(updateCurrentWorkingProject("inputs", inputs))
	};
};

export default connect(mapStatetoProps, mapDispatchToProps)(DisplayCSV);
