import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import DeleteIcon from "@material-ui/icons/Delete";

const DeleteProject = (props) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = () => {
		setOpen(false);
		console.log("TODO HANDLE DELETE");
	};
	return (
		<span>
			<button
				className="btn-flat waves-effect waves-light"
				style={{ display: "inline", color: "red" }}
				onClick={handleClickOpen}
			>
				DELETE
			</button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Delete this model once and ml for all?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this absolutely awesome
						machine learning model for you and others to experiment
						with?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<button
						className="btn-flat waves-effect waves-light"
						style={{ display: "inline", color: "green" }}
						onClick={handleClose}
					>
						Keep It!
					</button>
					<button
						className="btn-flat waves-effect waves-light"
						style={{ display: "inline", color: "red" }}
						onClick={handleDelete}
					>
						Delete Forever {" :("}
					</button>
				</DialogActions>
			</Dialog>
		</span>
	);
};

export default DeleteProject;
