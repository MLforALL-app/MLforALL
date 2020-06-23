import React, { Component } from "react";
import { connect } from "react-redux";
import Insights from "./insights";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import HelpBox from "../../../layouts/helpbox";
import MenuItem from "@material-ui/core/MenuItem";
import { updateCurrentWorkingProject } from "../../../../store/actions/projectActions";

class NaanHandler extends Component {
	state = {
		nanMethod: "drop"
	};
	handleDropdownNan = (event) => {
		this.setState({
			nanMethod: event.target.value
		});
		this.props.updateCurrentWorkingProject("nanMethod", event.target.value);
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
		if (this.props.count !== 0) {
			return (
				<span>
					<div className="row container">
						<Insights project={this.props.project} />
						<h6>
							<b>
								How do you want to deal with NaN's?{" "}
								<FormControl>
									<Select
										value={this.state.nanMethod}
										onChange={this.handleDropdownNan}
										displayEmpty>
										{this.getMenuItems([
											"drop",
											"zero",
											"median",
											"mean"
										])}
									</Select>
									<FormHelperText>Method</FormHelperText>
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
			);
		} else {
			return <span></span>;
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCurrentWorkingProject: (paramName, nanMethod) =>
			dispatch(updateCurrentWorkingProject(paramName, nanMethod))
	};
};

export default connect(null, mapDispatchToProps)(NaanHandler);
