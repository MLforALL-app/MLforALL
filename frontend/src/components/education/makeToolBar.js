import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, Element } from "react-scroll";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	appBar: {
		zIndex: 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		zIndex: 0
	},
	drawerPaper: {
		width: drawerWidth,
		zIndex: 0
	},
	drawerContainer: {
		overflow: "auto",
		zIndex: 0
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

const MakeDrawer = ({ sections }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}>
				<Toolbar />
				<div className={classes.drawerContainer}>
					{sections.map((subsection) => (
						<List key={`subsec_${subsection && subsection[0].to}`}>
							{subsection.map((obj) => (
								<Link
									key={`link_${obj.to}`}
									to={obj.to}
									smooth="true"
									duration={500}
									offset={-80}>
									<ListItem button key={obj.text}>
										<ListItemText primary={obj.text} />
									</ListItem>
								</Link>
							))}
						</List>
					))}
					<Divider />
				</div>
			</Drawer>
			<main className={classes.content}>
				{sections.map((subsection) => {
					return subsection.map((obj) => {
						return (
							<Element name={obj.to} className="element" key={`elem_${obj.to}`}>
								<div className="container">
									<h2 className="purple-text">{obj.title}</h2>
									{obj.content}
								</div>
							</Element>
						);
					});
				})}
			</main>
		</div>
	);
};

export default MakeDrawer;
