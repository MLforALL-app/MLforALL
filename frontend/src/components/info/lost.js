import React from "react";
import error404 from "../../pictures/backgrounds/error.svg";

const Lost = () => {
	return (
		<div className="row container center">
			<h2 className="purple-text">Not a Valid Link</h2>
			<h5>Something went wrong here... oops lmaoxd</h5>
			<p>
				If you think this is an error on our part, please email{" "}
				<b>lendevelops@gmail.com</b> and we'll get it fixed ASAP!
			</p>

			<img style={{ paddingTop: "2rem" }} alt="error" src={error404} />
		</div>
	);
};

export default Lost;
