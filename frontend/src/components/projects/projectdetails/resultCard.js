import React from "react";

const ResultCard = (state) => {
	return (
		<div className="card z-depth-0">
			<div className="card-content">
				<span className="card-title">ResultCard</span>
				<p>
					Given these inputs, a {state.model} would predict it to be:{" "}
					{state.output}{" "}
				</p>
			</div>
		</div>
	);
};

export default ResultCard;
