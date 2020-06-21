import React, { useState, Fragment } from "react";
import createImg from "../../../pictures/backgrounds/create.svg";
import CreateProject from "./createproject";
import "../../../styling/build.css";

const CreateLanding = () => {
	const [begin, setBegin] = useState(false);
	if (begin) {
		return <CreateProject />;
	} else {
		return (
			<Fragment>
				<div className="row container">
					<h1 className="purple-text">Welcome to create project! </h1>
					<div className="col s6 create-animation">
						<ul>
							<li>
								<h5>
									1. Download or Upload your own CSV datasets
								</h5>
							</li>
							<li>
								<h5>
									2. Fine tune parameters to and select
									Machine Learning models
								</h5>
							</li>
							<li>
								<h5> 3. Play, test, and share your models!</h5>
							</li>
						</ul>
						<div className="video container center">
							<div
								onClick={() => setBegin(true)}
								className="btn btn-sec waves-effect waves-light anchor center create-animation">
								Begin now!
							</div>
						</div>
					</div>
					<div className="col s6">
						<img
							className="create-animation"
							src={createImg}
							alt=""
						/>
					</div>
				</div>
			</Fragment>
		);
	}
};

export default CreateLanding;
