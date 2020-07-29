import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
// import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, Element } from "react-scroll";

const drawerWidth = 260;

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
	},
	listItem: {
		padding: 0
	},
	nested: {
		paddingLeft: theme.spacing(4),
		color: "#000"
	}
}));

const SmoothLink = ({ to, children }) => {
	return (
		<Link to={to} smooth="true" duration={500} offset={-80}>
			{children}
		</Link>
	);
};

const MakeDrawer = ({ sections }) => {
	const classes = useStyles();
	// state to open and close nested lists
	// const [open, setOpen] = React.useState(true);
	// state handler
	// const handleClick = () => {
	// 	setOpen(!open);
	// };
	// sidebar component
	const Sidebar = () => {
		const makeObjSidebar = (obj) => {
			return (
				<SmoothLink to={obj.to} key={`smooth_${obj.to}`}>
					<ListItem button className={classes.nested} key={obj.text}>
						<ListItemText primary={obj.text} />
					</ListItem>
				</SmoothLink>
			);
		};
		const makeSectionSidebar = (subsection) => {
			const { header, list } = subsection;
			return (
				<List key={`subsec_${header}_sidebar`} disablePadding>
					<Divider />
					<SmoothLink to={header}>
						<ListItem button>
							<ListItemText
								className="purple-text"
								primary={header}
								primaryTypographyProps={{ color: "inherit", variant: "h6" }}
							/>
						</ListItem>
					</SmoothLink>
					<Divider />
					{list.map(makeObjSidebar)}
				</List>
			);
		};
		return (
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>{sections.map(makeSectionSidebar)}</List>
				</div>
			</Drawer>
		);
	};
	// main content component
	const Content = () => {
		const makeObjContent = (obj) => {
			return (
				<Element name={obj.to} className="element" key={`elem_${obj.to}`}>
					{obj.content}
				</Element>
			);
		};
		const makeSubsectionContent = (sub) => {
			const { header, list } = sub;
			return (
				<div key={`subsec_${header}_content`} className="container">
					<Element name={header}>
						<h2 className="purple-text"> {header} </h2>
					</Element>
					{list.map(makeObjContent)}
				</div>
			);
		};
		return (
			<main className={classes.content}>
				{sections.map(makeSubsectionContent)}
			</main>
		);
	};
	return (
		<div className={classes.root}>
			<Sidebar />
			<Content />
		</div>
	);
};

export default MakeDrawer;
