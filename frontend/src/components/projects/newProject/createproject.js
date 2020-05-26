import React, { Component } from "react";
import { connect } from "react-redux";
import {
	createProject,
	uploadCSV
} from "../../../store/actions/projectActions";
import Papa from "papaparse";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class CreateProject extends Component {
	state = {
		title: "",
		content: "",
		csvName: "",
		temporary: [], // this will go w papa
		inputs: {}, // this will go w papa
		output: "" // this will go w papa
	};

	handleChange = (e) => {
		if (e.target.id !== "csvName") {
			this.setState({
				[e.target.id]: e.target.value
			});
		} else {
			//this puts the csv file in the state before we create project
			this.setState({
				[e.target.id]: e.target.files[0]
			});
		}
	};
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.csvName);
		console.log(this.props);
		this.props.uploadCSV(this.state.csvName, this.state.title);
		this.props.createProject(this.state);
		// can we do something like
		// this.props.history.push("/me") to get to UID?
		this.props.initProject();
		//this.props.history.push("/dashboard");
	};

	// THIS WILL GO WITH PAPA
	handleHeaderClick = ({ columnData, dataKey, event }) => {
		this.setState((prevState) => {
			console.log("PREV STATE", prevState);
			console.log("DATAKEY", dataKey);
			console.log("EVENT", event);
			var newInputs = prevState.inputs;
			newInputs[dataKey] = !newInputs[dataKey];
			console.log("NEW INPUTS", newInputs);
			return { ...prevState, inputs: newInputs };
		});
	};
	// THIS WILL GO WITH PAPA
	handleDropdown = (event) => {
		this.setState({ output: event.target.value });
	};
	// THIS WILL GO WITH PAPA
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
	// THIS WILL GO WITH PAPA
	getColumns = (keyList) => {
		//console.log("KEYLIST", keyList);
		var columns = [];
		keyList.forEach((key) => {
			columns.push(
				<Column label={key} dataKey={key} key={key} width={900} />
			);
			// setting width to 900 will cause overflow and force proper alignment
		});
		//console.log("Updated keylist", keyList);
		return columns;
	};
	// THIS WILL GO WITH PAPA
	initInputs = (inputs) => {
		var inputState = {};
		inputs.forEach((i) => {
			inputState[i] = false;
		});
		// console.log("INPUT STATE", inputState);
		return inputState;
	};
	// THIS WILL GO WITH PAPA
	bigPapa = (url) => {
		Papa.parse(
			"https://firebasestorage.googleapis.com/v0/b/mlforall-14bf7.appspot.com/o/UDjMojFqWHOdW0fCIJPMNPScQ9p1%2FSpotify%2Fsimple_top50.csv?alt=media&token=5f55645b-1884-47ee-b504-5e7f835cfa20",
			{
				download: true,
				worker: true,
				header: true,
				complete: (results) => {
					this.setState({
						temporary: results.data
					});
					const inputState = this.initInputs(
						Object.keys(results.data[0])
					);
					this.setState({
						inputs: inputState
					});
					console.log("All done!", results);
				}
			}
		);
	};

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h4 className="grey-text text-darken-3">Create Project</h4>
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input
							autoComplete="off"
							type="text"
							id="title"
							onChange={this.handleChange}
						/>
					</div>
					<div className="file-field input-field">
						<div className="btn blue lighten-1 z-depth-0">
							<span>Browse</span>
							<input
								type="file"
								id="csvName"
								onChange={this.handleChange}
							/>
						</div>

						<div className="file-path-wrapper">
							<input
								className="file-path validate"
								type="text"
								placeholder="Upload .csv file"
							/>
						</div>
					</div>
					<div className="input-field">
						<label htmlFor="content">Project Content</label>
						<textarea
							className="materialize-textarea"
							cols="30"
							rows="10"
							id="content"
							onChange={this.handleChange}
						></textarea>
					</div>
					<div className="input-field">
						<button className="btn blue lighten-1 z-depth-0">
							Create
						</button>
					</div>
					<button
						onClick={this.bigPapa}
						className="btn red darken-2 z-depth-0"
					>
						TESTING PAPA
					</button>
					{this.state.temporary.length === 0 ? (
						<span></span>
					) : (
						<div>
							<FormControl>
								<Select
									value={this.state.output}
									onChange={this.handleDropdown}
									displayEmpty
								>
									{this.getMenuItems(
										Object.keys(this.state.temporary[0])
									)}
								</Select>
								<FormHelperText>Model</FormHelperText>
							</FormControl>
							<Table
								width={900}
								height={400}
								headerHeight={20}
								rowHeight={30}
								onHeaderClick={this.handleHeaderClick}
								rowCount={this.state.temporary.length}
								rowGetter={({ index }) =>
									this.state.temporary[index]
								}
							>
								{this.getColumns(
									Object.keys(this.state.temporary[0])
								)}
							</Table>
						</div>
					)}
				</form>
				{console.log("OUTPUT", this.state.output)}
				{console.log("INPUTS", this.state.inputs)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createProject: (project) => dispatch(createProject(project)),
		uploadCSV: (csv, projTitle) => dispatch(uploadCSV(csv, projTitle))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
