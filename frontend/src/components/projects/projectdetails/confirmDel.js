import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const onConfirm = () => {
	console.log("This would be where we delete the project");
};

const DeleteProject = (props) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="confirm-dialog"
		>
			<DialogTitle id="confirm-dialog">Delete This Project</DialogTitle>
			<DialogContent>
				Are you sure you want to delete this super zesty awesome machine
				learning model? It can never be recovered!
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					onClick={() => setOpen(false)}
					color="secondary"
				>
					No
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						setOpen(false);
						onConfirm();
					}}
					color="default"
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteProject;
