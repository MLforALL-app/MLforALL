import React from "react";
/*
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
*/
import knn from "../../../../pictures/models/knn.svg";
import svm from "../../../../pictures/models/svm.svg";
import log_reg from "../../../../pictures/models/log_reg.svg";
import gnb from "../../../../pictures/models/gnb.svg";
import lda from "../../../../pictures/models/lda.svg";
import clf from "../../../../pictures/models/clf.svg";
// import Checkbox from "@material-ui/core/Checkbox";
import HelpBox from "../../../layouts/helpbox";

/*
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.paper
	}
}));
*/

const ModelCheck = ({ handleToggle, nameMapper, models }) => {
	// const classes = useStyles();
	/*
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
	*/
	const desc = {
		log_reg: "logistic regraysson",
		gnb: "gauss navigation bar",
		knn: "keep your nearrest neigbhors",
		svm: "small vegetable mind",
		clf: "trees are good for the wrold decsion classifier",
		lda: "line discrimnant analyisisisis"
	};
	const modelImgs = [
		["log_reg", log_reg],
		["knn", knn],
		["gnb", gnb],
		["clf", clf],
		["svm", svm],
		["lda", lda]
	];
	const makeCard = (value, img) => {
		return (
			<div className="col s6 m4">
				<div className="card center">
					<div onClick={handleToggle(value)}>
						{models[value] ? (
							<div className="card-content card-model-clicked">
								<img src={img} alt={value}></img>
							</div>
						) : (
							<div className="card-content card-model">
								<img src={img} alt={value}></img>
							</div>
						)}
						{models[value] ? (
							<div className="card-action card-action-clicked">
								<div style={{ float: "left" }}>
									<b>{nameMapper(value)} </b>
								</div>
								<div style={{ float: "right" }}>
									<HelpBox desc={desc[value]} />
								</div>
								<div style={{ clear: "both" }}></div>
							</div>
						) : (
							<div className="card-action">
								<div style={{ float: "left" }}>
									<b>{nameMapper(value)} </b>
								</div>
								<div style={{ float: "right" }}>
									<HelpBox desc={desc[value]} />
								</div>
								<div style={{ clear: "both" }}></div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};
	const modelCards = modelImgs.map(([value, img]) => makeCard(value, img));
	/*
	return (
		<div>
			<List className={classes.root}>
				{Object.entries(desc).map(([key, val]) =>
					makeListItem(key, val)
				)}
			</List>
		</div>
	);
	*/
	return (
		<div style={{ paddingTop: "2.5rem" }}>
			<div className="row">{modelCards.slice(0, 3)}</div>
			<div className="row">{modelCards.slice(3, 7)}</div>
		</div>
	);
};

export default ModelCheck;
