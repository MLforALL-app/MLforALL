import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component } from "react";
class BuildProject extends Component {
    // State to keep track of if our pop up is open
	state = {
		open: false
	};

	// Event handlers to open and close the popup
	handleClickOpen = (e) => {
		this.setState({ open: true });
	};
	handleClose = (e) => {
		this.setState({ open: false });
	};
	// if we choose to delete, make a dispatch to REDUX
	handleBuild = (pid, auth, project, history) => {
		return () => {
            this.props.handleSubmit(null);
		};
	};

	render() {
		return (
			<span>
                <button
                    onClick={this.handleClickOpen}
                    className="btn-large z-depth-0">
                    Build the model!
                </button>
                
                <Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					
                    {this.props.submitLoad ? (
                        <div>
                            <DialogTitle id="alert-dialog-title" className="purple-text">
                            Building Project
                            </DialogTitle>
                            <div className="row center">
                                <CircularProgress />
                                
                            </div>
                        </div>
				) : (
                    <div>
                    <DialogTitle id="alert-dialog-title" className="purple-text">
						Is this the project you want to build
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{this.props.getContent("")}
						</DialogContentText>
					</DialogContent>
                
					<DialogActions>
						<button
							className="btn-flat waves-effect waves-light"
							style={{ display: "inline", color: "#382980" }}
							onClick={this.handleClose}>
							No
						</button>
						<button
							className="btn-flat waves-effect waves-light"
							style={{ display: "inline", color: "#382980" }}
							onClick={this.handleBuild()}>
							Yes, Build It!
						</button>
                    </DialogActions>
                    </div>
            )}        
									
								
									
								
					
				</Dialog>
                
			</span>
		);
	}

}

export default BuildProject;