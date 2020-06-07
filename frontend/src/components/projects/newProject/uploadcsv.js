import React, { Component } from "react";
import Guide from "./guidingInfo";
import { connect } from "react-redux";
import {
	uploadCSVtoStorage,
	updateCsvNameOnProject
} from "../../../store/actions/projectActions";

import {Alert, AlertTitle} from "@material-ui/lab";




class UploadCSV extends Component {
	state = {
		csv: "",
		fileUploadMessage : "Waiting For File...",
		showError : false,
		errorText : ""
	};
	
	handleChange = (e) => {
		//console.log(e.target.files[0]);
		//console.log(this.getFileExtension(e.target.files[0].name));
		if (!e.target.files[0]){
			return;
		}
		let file = e.target.files[0]
		if (file.size > 50 * 1000000){
			this.setState({
				showError: true, 
				errorText: "Files above 50 Megabytes are not supported",
				fileUploadMessage: "File Too Large"
			})
		}
		else if (this.getFileExtension(file.name) === "csv"){
			console.log("storing file locally");
			this.setState({
				csv: file,
				showError: false,
				fileUploadMessage : "Upload",
			});
		}else{
			this.setState({
				fileUploadMessage: "Invalid File Type. Upload a CSV Please.",
				errorText: "Invalid File Type",
				showError: true
			});
		}

	};


	getFileExtension = (filename) => {
		return filename.split('.').pop();
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.showError || this.state.csv === ""){
			console.log("invalid submit.");
			return;
		}
		
		this.props.uploadCSVtoStorage(
			this.state.csv,
			this.props.project,
			this.props.projectID
		);
		this.props.updateCsvNameOnProject(
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
						{ this.state.showError ? 
							<Alert severity="error">
							<AlertTitle>Error</AlertTitle>
								<strong>{this.state.errorText}</strong> 
						 	 </Alert>
							:
							<span></span>
						}
						{  (!this.state.showError && this.state.csv !== "") ?
							<Alert severity="success">
							<AlertTitle>Success</AlertTitle>
								<strong>Successful CSV Upload</strong> 
						 	 </Alert>
							:
							<span></span>
						}

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
									{this.state.fileUploadMessage}
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
		uploadCSVtoStorage: (csv, project, id) => dispatch(uploadCSVtoStorage(csv, project, id)),
		updateCsvNameOnProject: (csv, project, id) =>
			dispatch(updateCsvNameOnProject(csv, project, id))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadCSV);
