import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import HelpBox from "../../../layouts/helpbox";
import MenuItem from "@material-ui/core/MenuItem";
import { updateCurrentWorkingProject } from "../../../../store/actions/projectActions";
import { CircularProgress } from "@material-ui/core";


class ModelOutput extends Component{
    state = {
        output : "Output",
        cols : "",
        loading : true,
    }
	handleDropdownOutput = (event) => {
        console.log("setting output to ", event.target.value);
        this.setState({ output: event.target.value });
        this.props.setOutput(event.target.value);
    };

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
    
   

    render() {

        return (

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
													this.props.cols
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
        );
    };
}

const mapStateToProps = (state) => {
    if(state.project.csvData){
        console.log("Model Output!", state.project.csvData[0]);
    }
    
    return {
        cols : state.project.csvData && state.project.csvData[0]
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setOutput: (targetParameter) => dispatch(updateCurrentWorkingProject("targetParameter", targetParameter))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ModelOutput);