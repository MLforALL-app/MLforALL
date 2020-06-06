import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.paper
	}
}));

const desc = {
	log_reg: "logistic regraysson",
	gnb: "gauss navigation bar",
	knn: "keep your nearrest neigbhors",
	svm: "small vegetable mind",
	clf: "trees are good for the wrold decsion classifier",
	lda: "line discrimnant analyisisisis"
};

const ModelCheck = ({ filterObj, handleToggle, models, nameMapper }) => {
	const classes = useStyles();
	const makeListItem = (value, description) => {
		return (
			<ListItem key={value} dense button onClick={handleToggle(value)}>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={models[value]}
						disableRipple
					/>
				</ListItemIcon>
				<ListItemText
					id={value}
					primary={nameMapper(value)}
					secondary={description}
				/>
			</ListItem>
		);
	};

	return (
		<div>
			<List className={classes.root}>
				{Object.entries(desc).map(([key, val]) =>
					makeListItem(key, val)
				)}
			</List>
		</div>
	);
};

export default ModelCheck;
