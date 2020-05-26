import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const nameMapper = (name) => {
	switch (name) {
		case "":
			return "Nothing Selected Yet";
		case "log_reg":
			return "Logistic Regression";
		case "gnb":
			return "Gauss Naive Bayes";
		case "knn":
			return "K-Nearest Neighbors";
		case "svm":
			return "Support Vector Machine";
		case "clf":
			return "Decision Tree Classifier";
		case "lda":
			return "Linear Discriminant Analysis";
		default:
			return "Error: Not valid model name";
	}
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: "90%",
		backgroundColor: theme.palette.background.paper
	}
}));

const ModelCheck = ({ filterObj, handleToggle, models }) => {
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
			<p>{"Selected :" + filterObj(models)}</p>
			<List className={classes.root}>
				{makeListItem("log_reg", "description")}
				{makeListItem("knn", "description")}
				{makeListItem("gnb", "description")}
				{makeListItem("lda", "description")}
				{makeListItem("svm", "description")}
				{makeListItem("clf", "description")}
			</List>
		</div>
	);
};

export default ModelCheck;
