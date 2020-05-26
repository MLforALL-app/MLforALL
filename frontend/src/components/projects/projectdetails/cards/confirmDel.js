import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteMLProject } from "../../../../store/actions/projectActions";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";

class DeleteProject extends Component {
	state = {
		open: false
	};

	handleClickOpen = (e) => {
		this.setState({ open: true });
	};
	handleClose = (e) => {
		this.setState({ open: false });
	};
	handleDelete = (id, auth, project) => {
		return () => {
			this.setState({ open: false });
			this.props.deleteMLProject(id, auth, project);
			this.props.history.push("/dashboard");
		};
	};

	render() {
		const { id, auth, project } = this.props;
		// console.log("THIS IS SPARTA", id);
		// console.log("THIS IS AUTH SPARTA", auth);
		return (
			<span>
				<button
					className="btn-flat waves-effect waves-light"
					style={{ display: "inline", color: "red" }}
					onClick={this.handleClickOpen}
				>
					DELETE
				</button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						Delete this model once and ml for all?
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete this absolutely
							awesome machine learning model for you and others to
							experiment with?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<button
							className="btn-flat waves-effect waves-light"
							style={{ display: "inline", color: "green" }}
							onClick={this.handleClose}
						>
							Keep It!
						</button>
						<button
							className="btn-flat waves-effect waves-light"
							style={{ display: "inline", color: "red" }}
							onClick={this.handleDelete(id, auth, project)}
						>
							Delete Forever {" :("}
						</button>
					</DialogActions>
				</Dialog>
			</span>
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
		deleteMLProject: (id, auth, project) =>
			dispatch(deleteMLProject(id, auth, project))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProject);
