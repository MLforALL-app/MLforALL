import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
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
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3)
	}
}));

const MakeDrawer = ({ sections }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" noWrap>
						ML for All Notes
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
				anchor="left"
			>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					{sections.map((obj) => (
						<Link to={obj.to} smooth="true" duration="500">
							<ListItem button key={obj.text}>
								<ListItemText primary={obj.text} />
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{sections.map((obj) => {
					return (
						<Element name={obj.to} className="element">
							<Typography paragraph>{obj.content}</Typography>
						</Element>
					);
				})}
			</main>
		</div>
	);
};

export default MakeDrawer;
