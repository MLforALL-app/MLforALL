import React from "react";
import logo from "../../pictures/backgrounds/logo.png";

const Mobile = () => {
	return (
		<div
			style={{
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)"
			}}
			className="container"
		>
			<h1 className="purple-text">
				<img style={{ height: "4.5rem" }} src={logo} alt="" />
				forALL
			</h1>
			<p>
				This site is best viewed on desktop and is not supported on
				mobile. View{" "}
				<b>
					<span className="purple-text"> MLforALL </span>
				</b>{" "}
				on desktop for the best experience. Check out{" "}
				<a href="https://www.youtube.com/embed/CswRqTuqzHQ">
					this video
				</a>{" "}
				to learn more.
			</p>
		</div>
	);
};

export default Mobile;
