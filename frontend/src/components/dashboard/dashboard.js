import React, { Component } from "react";
// import Notifications from "./notifcations";
import ProjectList from "../projects/projectList/projectlist";
//import MenuItem from "@material-ui/core/MenuItem";
//import FormControl from "@material-ui/core/FormControl";
//import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
	state = {
		orderBy: "createdAt",
		limit: 6,
		direction: "desc"
	};
	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to="/" />;
		if (!auth.emailVerified) return <Redirect to={`/verify`} />;
		//if (refresh) return <Redirect to="/dashboard" />;
		return (
			<div className="dashboard container">
				<div className="row">
					<h1>
						<span className="purple-text">Explore </span>
					</h1>
					<h4 style={{ float: "left" }}>
						See what others are up to.
					</h4>
					insert form here
				</div>
				{/*<div className="row">
					<Notifications notifications={notifications} />
				</div>*/}
				<ProjectList
					orderBy={this.state.orderBy}
					limit={this.state.limit}
					direction={this.state.direction}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(Dashboard);

/*

	<FormControl style={{ float: "right" }}>
						<span>
							Sort By:{" "}
							<Select
								value={this.state.orderBy}
								onChange={(e) =>
									this.setState({
										orderBy: e.target.value,
										refresh: true
									})
								}
								displayEmpty>
								<MenuItem value="createdAt">Date</MenuItem>
								<MenuItem value="title">Title</MenuItem>
								<MenuItem value="authorFirstName">
									First Name
								</MenuItem>
								<MenuItem value="authorLastName">
									Last Name
								</MenuItem>
							</Select>
						</span>
					</FormControl>

*/
