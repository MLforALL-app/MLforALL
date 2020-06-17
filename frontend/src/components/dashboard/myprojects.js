import React, { Component } from "react";
import ProjectList from "../projects/projectList/projectlist";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import HelpBox from "../layouts/helpbox";

const greetings = () => {
	const hi = ["Howdy", "Hello", "Hi there", "What's up"];
	const index = Math.floor(Math.random() * hi.length);
	return hi[index];
};

const greeting = greetings();

class MyProjects extends Component {
	state = {
		orderBy: "createdAt",
		direction: "desc",
		limit: 5,
		greet: ""
	};
	componentDidUpdate() {
		if (this.state.greet === "") {
			this.setState({
				greet: this.props.profile.isLoaded
					? greeting + " " + this.props.profile.firstName + "!"
					: ""
			});
		}
	}
	render() {
		const { auth, profile } = this.props;
		console.log("THIS IS prof", profile);
		// Route Protection
		if (!auth.uid) return <Redirect to="/" />;
		if (!auth.emailVerified) return <Redirect to={`/verify`} />;
		// maybe instead of redirecting, we can have another sign up page here
		// otws good to go
		// TODO: change const projects so its only this user's projects
		// pass this in to project list uid={auth.uid}
		return (
			<div>
				<div className="dashboard container">
					<div className="row">
						<h1>
							<span className="purple-text">
								My models.{" "}
								<HelpBox
									header="My models"
									placement="right-start"
									desc="Click on the cards to view your classification models!"
								/>
							</span>
						</h1>
						<h4 style={{ float: "left" }}>{this.state.greet}</h4>
						<FormControl style={{ float: "right" }}>
							<span>
								Sort By:{" "}
								<Select
									value={this.state.orderBy}
									onChange={(e) =>
										this.setState({
											orderBy: e.target.value
										})
									}
									displayEmpty>
									<MenuItem value="createdAt">Date</MenuItem>
									<MenuItem value="title">Title</MenuItem>
								</Select>
							</span>
						</FormControl>
					</div>
					<ProjectList
						orderBy={this.state.orderBy}
						limit={this.state.limit}
						direction={this.state.direction}
						uid={auth.uid}
					/>
					<div className="video center">
						<Link to="/create">
							<div className="btn btn-sec waves-effect waves-light z-depth-0">
								Click Here to Create More!
							</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(mapStateToProps)(MyProjects);
