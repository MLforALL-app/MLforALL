import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: "#ffdce8",
		color: "black",
		maxWidth: "30rem",
		paddingLeft: "1.3rem",
		paddingRight: "1.3rem",
		fontSize: theme.typography.pxToRem(16),
		boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
		borderRadius: "30px"
	}
}))(Tooltip);

class HelpBox extends Component {
	render() {
		const { header, desc, placement, link, linkdesc } = this.props;
		return (
			<HtmlTooltip
				leaveDelay={link ? 750 : 100}
				title={
					<React.Fragment>
						<h5>{header}</h5>
						<p>
							{desc}
							<br />
							<a href={link}>{linkdesc}</a>
						</p>
					</React.Fragment>
				}
				placement={placement}>
				<HelpIcon />
			</HtmlTooltip>
		);
	}
}

export default HelpBox;
