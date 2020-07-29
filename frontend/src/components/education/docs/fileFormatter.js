import React from "react";
import MathJax from "react-mathjax";
import RemarkMathPlugin from "remark-math";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const purpleTheme = "#283593";
export const purpleLight = "#7a5eeb";
export const purpleDark = "#261473";
export const pinkTheme = "#f8bbd0";
export const pinkLight = "#ffdbfd";
export const pinkDark = "#cf88cb";
export const grey = "#c7c7c7";

export function header(str) {
	return <h4>{str}</h4>;
}

export function bodyContent(str) {
	const ReactMarkdown = require("react-markdown");

	const newProps = {
		...str,
		plugins: [RemarkMathPlugin],
		renderers: {
			...str.renderers,
			math: (str) => <MathJax.Node formula={str.value} />,
			inlineMath: (str) => <MathJax.Node inline formula={str.value} />
		}
	};

	return (
		<MathJax.Provider input="tex">
			<ReactMarkdown source={str} {...newProps} />
		</MathJax.Provider>
	);
}

// Accordion
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		zDepth: -1
	},
	summary: {
		backgroundColor: pinkTheme
	},
	heading: {
		fontSize: theme.typography.pxToRem(20),
		fontWeight: theme.typography.fontWeightBold
	}
}));

export function SeeMore({ title, children }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					className={classes.summary}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header">
					<Typography className={classes.heading}>
						{title || "View more"}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>{children}</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
