import React from "react";

const Guide = () => {
	return (
		<div className="row container">
			<h3>
				<span className="purple-text">
					<b>Choosing a Dataset</b>
				</span>
			</h3>
			To get your project started, type in a project name and click
			initialize project. If this is your first project, don't worry!
			There will be plenty of explanation and recourses provided as you
			get started. TODO: THIS CAN BE LOCATION FOR MORE EXPLANATION.
			<br />
			<span className="card-title"> Finding CSV's</span>
			<ul>
				<li>
					<a href="https://www.kaggle.com/datasets">
						Check out Kaggle,
					</a>
				</li>
				<li>
					<a href="https://data.world/">data.world (needs login),</a>
				</li>
				<li>
					<a href="https://registry.opendata.aws/">
						Amazon's open registry,
					</a>
				</li>
				<li>
					<a href="https://datasetsearch.research.google.com/">
						{" "}
						or Google's dataset search engine!
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Guide;
