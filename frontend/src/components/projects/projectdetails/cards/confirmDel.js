import React, { useState } from "react";
import Button from "@material-ui/core/Button";
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
	return (
		<span>
			<button
				className="btn-flat waves-effect waves-light"
				style={{ display: "inline" }}
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
					<Button
						onClick={handleClose}
						color="primary"
						variant="contained"
					>
						No
					</Button>
					<Button
						onClick={handleClose}
						color="primary"
						variant="contained"
					>
						Yes, Delete This Model
					</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
};

export default DeleteProject;
