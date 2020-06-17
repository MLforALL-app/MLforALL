import React, { Component } from "react";
import ProjectList from "../projects/projectList/projectlist";
import SortForm from "./sortform";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

/*
const greetings = () => {
	const hi = ["Howdy", "Hello", "Hi there", "What's up"];
	const index = Math.floor(Math.random() * hi.length);
	return hi[index];
};
const greeting = greetings();
*/

class MyProjects extends Component {
	state = {
		orderBy: "createdAt",
		direction: false, // false = desc, true = asc
		limit: 8,
		greet: "Welcome to your central hub."
	};
	componentDidUpdate() {
		/*
		if (this.state.greet === "Hello") {
			this.setState({
				greet: this.props.profile.isLoaded
					? greeting + " " + this.props.profile.firstName + "!"
					: ""
			});
		}
		*/
	}
	render() {
		const { auth } = this.props;
		//console.log("THIS IS prof", profile);
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
							<span className="purple-text">My models. </span>
						</h1>
						<h4 style={{ float: "left" }}>{this.state.greet}</h4>
						<SortForm
							handleDropChange={(e) =>
								this.setState({
									orderBy: e.target.value
								})
							}
							handleSwitchChange={() =>
								this.setState((prev) => {
									return { direction: !prev.direction };
								})
							}
							orderBy={this.state.orderBy}
							direction={this.state.direction}
							me={true}
						/>
					</div>
					{/* For now myprojects page has no pages */}
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
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(mapStateToProps)(MyProjects);

/*
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
*/
