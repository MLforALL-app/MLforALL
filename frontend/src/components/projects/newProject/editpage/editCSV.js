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
import firebase from "../../../../config/fbConfig";
import axios from "axios";
import { updateContent } from "../../../../store/actions/projectActions";
import ModelCheck from "./modelcheck";
import HelpBox from "../../../layouts/helpbox";
import styles from "./build.css";
import Insights from "./insights";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const addSpace = (list) => {
	return list.map((s) => " " + s);
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
		nanMethod: "drop",
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
	handleDropdownNan = (event) => {
		this.setState({ nanMethod: event.target.value });
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
				<FormControlLabel
					className="purple-text"
					value="bottom"
					control={<Checkbox color="primary" />}
					label=""
					labelPlacement="bottom"
					onChange={this.checkBoxChange(colName)}
				/>

				<span
					className="ReactVirtualized__Table__headerTruncatedText purple-text"
					style={{ textAlign: "left" }}
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
	componentDidMount = () => {
		this.initCSV();
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
								headerHeight={60}
								rowHeight={25}
								rowCount={this.state.csvArray.length}
								rowGetter={({ index }) =>
									this.state.csvArray[index]
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
									Object.keys(this.state.csvArray[0])
								)}
							</Table>
						</div>
						{this.props.project.info.NaN === 0 ? (
							<div className="row container"></div>
						) : (
							<span>
								<div className="row container">
									<Insights project={this.props.project} />
									<h6>
										<b>
											How do you want to deal with NaN's?{" "}
											<FormControl>
												<Select
													value={this.state.nanMethod}
													onChange={
														this.handleDropdownNan
													}
													displayEmpty
												>
													{this.getMenuItems([
														"drop",
														"zero",
														"median",
														"mean"
													])}
												</Select>
												<FormHelperText>
													Method
												</FormHelperText>
											</FormControl>
											{"  "}
											<span className="pink-text">
												<HelpBox
													header="Data Cleaning Dropdown"
													placement="right"
													desc="Use this dropdown menu to select how you would like to clean your NaN's. Drop will ignore all the rows that contain NaN's in a particular column. Zero will set all NaN's to zero. Median/mean will replace all NaN's with the median/mean of the existing inputs."
												/>
											</span>
										</b>
									</h6>
								</div>
							</span>
						)}
						<div className="row container">
							<h5>
								<b>
									2. In order to predict this output
									parameter:{" "}
									<FormControl>
										<Select
											value={this.state.output}
											onChange={this.handleDropdownOutput}
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
									handleToggle={this.handleModelToggle}
									nameMapper={nameMapper}
									models={this.state.models}
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

const mapStatetoProps = (state, ownProps) => {
	return {
		auth: state.firebase.auth
	};
};
// Redux to associate action call to a dispatch
const mapDispatchToProps = (dispatch) => {
	return {
		updateContent: (content, pid) => dispatch(updateContent(content, pid))
	};
};

export default connect(mapStatetoProps, mapDispatchToProps)(DisplayCSV);
