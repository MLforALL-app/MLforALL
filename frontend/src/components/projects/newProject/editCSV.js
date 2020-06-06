import React, { Component } from "react";
import { connect } from "react-redux";
import Papa from "papaparse";
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
import firebase from "../../../config/fbConfig";
import axios from "axios";
import ModelCheck from "./modelcheck";
import HelpBox from "../../layouts/helpbox";

const addSpace = (list) => {
	return list.map((s) => s + " ");
};
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
							This model will take these parameters:{" "}
							<span className="purple-text">
								{addSpace(inputs)}
							</span>
							<br />
							to attempt to predict{" "}
							<span className="purple-text">{output}</span> <br />
							using these algorithms:{" "}
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
	handleDropdown = (event) => {
		this.setState({ output: event.target.value });
	};
	handleModelToggle = (value) => () => {
		//console.log("VALUE IN HANDLE TOGGLE", value);
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
				//console.log("All done!", results);
			}
		});
	};
	// initialize the CSV in firebase storage and then big papa it
	initCSV = () => {
		const csvPath =
			this.props.project.authorID +
			"/" +
			this.props.id +
			"/" +
			this.props.project.csvName;
		var csvRef = firebase.storage().ref(csvPath);
		csvRef
			.getDownloadURL()
			.then((url) => {
				console.log("This the url", url);
				this.bigPapa(url); // populates the csvArray state
				this.setState({ error: false });
			})
			.catch((err) => {
				console.log("SOMETHING wrong uhOh", err);
				this.setState({ error: true });
			});
	};
	// handle submitting the project
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true, error: false });
		const path = {
			uid: this.props.auth.uid,
			projectID: this.props.id,
			title: this.props.project.title,
			modelList: this.filterObj(this.state.models),
			targetParameter: this.state.output,
			dfVariables: this.filterObj(this.state.inputs),
			csvName: this.props.project.csvName
		};
		console.log(path);
		axios
			.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/store`, path)
			.then((res) => {
				console.log("THIS IS RESULT", res);
				this.setState({ redirect: true });
				console.log("Successfully created project models?");
			})
			.catch((err) => {
				console.log("THIS IS AN ERROR", err);
				this.setState({ loading: false });
				this.setState({ error: true });
			});
	};
	componentDidMount = () => {
		this.initCSV();
		/*console.log(
			"INITILA OBJ",
			this.initObj(["log_reg", "knn", "clf", "gnb", "svm", "lda"])
		);*/
	};
	render() {
		return (
			<div className="displaycsv">
				{this.state.redirect ? (
					<Redirect to={"/project/" + this.props.id} />
				) : (
					<span></span>
				)}
				{this.state.csvArray.length === 0 ? (
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
						<div
							style={{ paddingTop: "1.5rem" }}
							className="row container"
						>
							<h5>
								<b>
									2. In order to predict this output
									parameter:{" "}
									<FormControl>
										<Select
											value={this.state.output}
											onChange={this.handleDropdown}
											displayEmpty
										>
											{this.getMenuItems(
												Object.keys(
													this.state.csvArray[0]
												)
											)}
										</Select>
										<FormHelperText>
											Output Parameter
										</FormHelperText>
									</FormControl>
									{"  "}
									<span className="pink-text">
										<HelpBox
											header="Output Dropdown"
											placement="right"
											desc="Use this dropdown menu to select what column you would like to designate as your output value. This is the parameter that your machine learning model will try to predict!"
										/>
									</span>
								</b>
							</h5>
						</div>
						<div className="row container">
							<h5>
								<b>3. Choose your algorithms / models</b>{" "}
								<span className="pink-text">
									<HelpBox
										header="Click the models!"
										placement="right-end"
										desc="There's many ways to set up machine learning models. That mean's there also many algorithms used to achieve this predictive power. Click on the link to learn more!"
										link="https://www.youtube.com/watch?v=hSlb1ezRqfA"
										linkdesc="Learn more here"
									/>
								</span>
							</h5>
							<div>
								<ModelCheck
									filterObj={this.filterObj}
									handleToggle={this.handleModelToggle}
									models={this.state.models}
									nameMapper={nameMapper}
								/>
							</div>
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
								<CircularProgress />
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
	// console.log("LOOK AT ME", state);
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStatetoProps)(DisplayCSV);
