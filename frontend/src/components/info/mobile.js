import React from "react";
import logo from "../../pictures/backgrounds/logo.png";
import oops from "../../pictures/backgrounds/oops.svg";

const Mobile = () => {
	return (
		<div className="container">
			<h1 className="purple-text">
				<img style={{ height: "4rem" }} src={logo} alt="" />
				forALL
			</h1>
			<br />
			<br />
			<br />
			<div>
				<h4>Sorry.</h4>
				<br />
				<p>
					This site is best viewed on <b>desktop/laptop</b> and is not
					supported on mobile. Check out{" "}
					<u>
						<a href="https://www.youtube.com/embed/CswRqTuqzHQ">
							this video
						</a>
					</u>{" "}
					to learn more.
				</p>
				<br />
				<br />
				<br />
				<br />
				<img src={oops} alt="" />
			</div>
		</div>
	);
};

export default Mobile;
