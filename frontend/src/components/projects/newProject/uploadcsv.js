import React, { Component } from "react";
import Guide from "./guidingInfo";
import { connect } from "react-redux";
import {
	uploadCSV,
	updateCsvData
} from "../../../store/actions/projectActions";
class UploadCSV extends Component {
	state = {
		csv: ""
	};
	handleChange = (e) => {
		this.setState({
			csv: e.target.files[0]
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.uploadCSV(
			this.state.csv,
			this.props.project,
			this.props.projectID
		);
		this.props.updateCsvData(
			this.state.csv,
			this.props.project,
			this.props.projectID
		);
	};
	render() {
		return (
			<div className="upload-csv">
				<div className="row" style={{ backgroundColor: "#eeeeee" }}>
					<div className="container">
						<form onSubmit={this.handleSubmit}>
							<div className="file-field input-field">
								<div
									className="btn z-depth-0"
									style={{ borderRadius: "50px" }}
								>
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
										accept=".csv"
									/>
								</div>
							</div>
							<div className="input-field">
								<button
									className="btn  z-depth-0"
									style={{ borderRadius: "50px" }}
								>
									Upload
								</button>
							</div>
						</form>
					</div>
				</div>
				<Guide />
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
		uploadCSV: (csv, project, id) => dispatch(uploadCSV(csv, project, id)),
		updateCsvData: (csv, project, id) =>
			dispatch(updateCsvData(csv, project, id))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadCSV);
