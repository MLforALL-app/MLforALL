import React, { Component } from "react";
import { nameMapper } from "../../../../store/actions/nameMapper";
import PredictSlider from "./predictslide";
import Dropdown from "./dropdown";
import CategoricalDropdown from "./categoricaldropdown";
import ResultCard from "./resultCard";
import HelpBox from "../../../layouts/helpbox";
import apiHost from "../../../../config/api.js";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const refreshState = (project) => {
	return {
		model: Object.keys(project.models)[0],
		inputs: initInputs(project.variables),
		output: "",
		loading: false,
		resInputs: {},
		resModel: ""
	};
};

// Helper function for brief descriptions about each model
const getDesc = (name) => {
	switch (name) {
		case "":
			return "Nothing Selected Yet";
		case "log_reg":
			return "Classifies based on class probabilities modeled by logistic function";
		case "gnb":
			return "Classifies under assumptions of Gaussian data and independence";
		case "knn":
			return "Classifies based on distance to closest k training examples";
		case "svm":
			return "Classifies by creating maximum margin decision boundaries";
		case "clf":
			return "Classifies using consecutive true/false decision rules";
		case "lda":
			return "Classifies using Bayes' theorem assuming each class is normally distributed with equal covariance";
		default:
			return "Error: Not valid model name";
	}
};

// Initialize our state with average values for datasets
const initInputs = (variables) => {
	var inputs = {};
	variables.forEach((v) => {
		if(!v.isString){
			inputs[v.name] = v.q2;
		}else{
			console.log("CATEGORICAL VALUES", v.values, v.values[0]);
			inputs[v.name] = v.values[0];
		}
		
	});
	console.log(inputs);
	return inputs;
};

/* REQUIRES: passed in props be a project a valid reference to Firebase
 * 			 firestore document, and uid the userID for current user
 * ENSURES: higher order function to create components for sliders and
 * 			result display */
class GenerateSliders extends Component {
	// Set initial model to be the first one
	state = refreshState(this.props.project);
	// event handler for when model dropdown menu changes
	handleDropChange = (event) => {
		this.setState({ model: event.target.value });
	};
	// hsc and hic are higher order functions to allow for generality
	// of event handlers
	handleSliderChange = (v) => {
		return (event, newValue) => {
			console.log(this.state);
			event.preventDefault();
			this.setState((prevState) => {
				var alterState = prevState;
				console.log(newValue);
				alterState.inputs[v.name] = newValue;
				return alterState;
			});
		};
	};
	handleCategoricalChange = (v) => {
		return (event, newValue) => {
			if(event){
				event.preventDefault();
			}
			this.setState((prevState) => {
				var alterState = prevState;
				alterState.inputs[v.name] = newValue["key"];
				return alterState;
			})
		};
	};
	handleInputChange = (v) => {
		return (event) => {
			event.preventDefault();
			const newValue =
				event.target.value === "" ? "" : Number(event.target.value);
			this.setState((prevState) => {
				var alterState = prevState;
				alterState.inputs[v.name] = newValue;
				return alterState;
			});
		};
	};
	// Event handler for when user presses "Generate" button
	handleSubmit = (event) => {
		event.preventDefault();
		// Update the inputs/models ur showing
		this.setState((prevState) => {
			return {
				resInputs: prevState.inputs,
				resModel: prevState.model
			};
		});
		if (this.state.model === "") {
			this.setState({ output: "chooseModel" });
		} else if (
			Object.keys(this.state.inputs).length !==
			this.props.project.variables.length
		) {
			this.setState({ output: "chooseInput" });
		} else {
			// create path for API Post Request
			const path = {
				uid: this.props.project.authorID,
				projId: this.props.pid,
				model: this.state.model,
				inputs: Object.values(this.state.inputs)
			};
			console.log(path);
			this.setState({ loading: true });
			axios
				.post(`${apiHost}/predict`, path)
				.then((res) => {
					// If things work, set the output and stop loading
					this.setState({ output: res, loading: false });
				})
				.catch((err) => {
					// If things don't work, server error and stop loading
					this.setState({ output: "Server Error", loading: false });
				});
		}
	};
	// Higher order fn to create a PredictSlider for each of our variables
	// using generalized event handlers so we can alter state from here
	getSlides(variables, hsc, hic, hcc) {
		if (variables.length > 0) {
			var output = [];
			variables.forEach((v) => {
				if(!v.isString){
					output.push(
						PredictSlider(v, hsc(v), hic(v), this.state.inputs[v.name])
					);
				}else{
					console.log("MAKING A DROP DOWN", v.name, v.values);
					console.log(this.state.inputs);
					output.push(
						CategoricalDropdown(v.name, v.values, this.state.inputs[v.name], hcc(v))
					);
					
				}
				
			});
			return <div>{output}</div>;
		} else {
			return <p> NO SLIDERS YET </p>;
		}
	}
	componentDidUpdate = (prev) => {
		const projectNew = this.props.project;
		if (prev && prev !== this.props) {
			this.setState(refreshState(projectNew));
		}
		console.log(this.state);
	}
	componentDidMount = () => {
		const projectNew = this.props.project;
		this.setState(refreshState(projectNew));
		console.log(this.state);
	}
	render() {
		const { project } = this.props;
		const { model, resModel, resInputs, loading, output } = this.state;
		if(!this.state.inputs){
			return <CircularProgress/>	
		}
		return (

			<div className="predict">
				<div className="row slider-row">
					<div className="container">
						<div className="slider-title">
							<h5>
								Type of model:{" "}
								{Dropdown(project, model, this.handleDropChange, nameMapper)}{" "}
								has accuracy{" "}
								{project &&
									project.models &&
									project.models[model] &&
									(project.models[model].accuracy * 100).toFixed(2) + "%"}
								<HelpBox
									placement="right"
									desc={getDesc(model)}
									link="help"
									linkdesc="Learn more here"
								/>
							</h5>
						</div>
						<div className="slider-contain">
							{this.getSlides(
								project.variables,
								this.handleSliderChange,
								this.handleInputChange,
								this.handleCategoricalChange
							)}
							<div
								className="row"
								style={{
									paddingTop: "2rem",
									textAlign: "right"
								}}>
								<HelpBox
									placement="left"
									desc="Click here to generate a prediction based off of the slider values you've chosen above!"
								/>{" "}
								<button
									className="btn waves-effect waves-light anchor"
									onClick={this.handleSubmit}>
									<b>Generate</b>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="row slider-row">
					{ResultCard(
						resModel,
						resInputs,
						output,
						project.targetParam,
						loading,
						nameMapper
					)}{" "}
				</div>
			</div>
		);
	}
}

export default GenerateSliders;
