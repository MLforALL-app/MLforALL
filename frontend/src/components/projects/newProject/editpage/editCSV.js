import React, { Component } from "react";
import { connect } from "react-redux";
import { Column, Table } from "react-virtualized";
import { Redirect } from "react-router-dom";
import "react-virtualized/styles.css"; // only needs to be imported once
// import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import "firebase/storage";
import firebase from "../../../../config/fbConfig";
import axios from "axios";
import { updateContent } from "../../../../store/actions/projectActions";
import HelpBox from "../../../layouts/helpbox";
import styles from "./build.css";
import Insights from "./insights";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
	// card to show what user is picking
	getStatus = (inputs, output, models, nameMapper) => {
		return (
			<div className="container center">
				<div className="card">
					<div className="card-content">
						<span className="purple-text">
							<h5>
								<b>
									{this.state.error
										? "Something went Wrong"
										: "What Your Model Does"}{" "}
								</b>
							</h5>
						</span>
						<h6>
							This model will take these parameters:
							<span className="purple-text">
								{addSpace(inputs)}
							</span>
							<br /> to attempt to predict{" "}
							<span className="purple-text">{output}</span> <br />{" "}
							using these algorithms:
							<span className="purple-text">
								{addSpace(models.map((s) => nameMapper(s)))}
							</span>
						</h6>
					</div>
				</div>
			</div>
		);
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
	// State
	state = {
		csvArray: [],
		models: this.initObj(["log_reg", "knn", "clf", "gnb", "svm", "lda"]),
		inputs: {},
		output: "",
		redirect: false,
		loading: false,
		error: false
	};
	// Handlers for things on the page
	handleHeaderClick = ({ columnData, dataKey, event }) => {
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
		console.log(this.state);
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

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true, error: false });
		const getContent = (content) => {
			if (content === "") {
				return (
					"These models attempt to predict " +
					this.state.output +
					" and how it relates to " +
					addSpace(this.filterObj(this.state.inputs)) +
					" using the following models: " +
					addSpace(
						this.filterObj(this.state.models).map((s) =>
							nameMapper(s)
						)
					)
				);
			} else {
				return content;
			}
		};
		this.props.updateContent(
			getContent(this.props.project.content),
			this.props.id
		);
		const path = {
			uid: this.props.auth.uid,
			projId: this.props.id,
			title: this.props.project.title,
			modelList: this.filterObj(this.state.models),
			targetParameter: this.state.output,
			dfVariables: this.filterObj(this.state.inputs),
			csvName: this.props.project.csvName,
			nanMethod: this.state.nanMethod
		};
		console.log(path);
		axios
			.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/store`, path)
			.then((res) => {
				console.log("THIS IS RESULT", res);
				this.setState({ redirect: true });
				//console.log("Successfully created project models?");
			})
			.catch((err) => {
				console.log("THIS IS AN ERROR", err);
				this.setState({ loading: false });
				this.setState({ error: true });
			});
	};

	componentDidUpdate = () => {
		if(this.state.loading === true && this.props.csvData !== ""){
			this.setState({
				csvArray : this.props.csvData,
				loading : false
			})
			console.log(this.props.csvData,);
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
						

						<div className="row" style={{ padding: "2rem" }}>
							{this.getStatus(
								this.filterObj(this.state.inputs),
								this.state.output,
								this.filterObj(this.state.models),
								nameMapper
							)}
						</div>
						<div className="row container center">
							<button
								onClick={this.handleSubmit}
								className="btn-large z-depth-0"
							>
								Build the model!
							</button>
							{this.state.loading ? (
								<div className="row">
									<CircularProgress />
								</div>
							) : (
								<span></span>
							)}
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
		csvData: state.project.csvData
	};
};
// Redux to associate action call to a dispatch
const mapDispatchToProps = (dispatch) => {
	return {
		updateContent: (content, pid) => dispatch(updateContent(content, pid))
	};
};

export default connect(mapStatetoProps, mapDispatchToProps)(DisplayCSV);
