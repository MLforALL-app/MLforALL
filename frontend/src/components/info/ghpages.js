import React from "react";
import { Redirect } from "react-router-dom";

const GHPages = () => {
	/* A simple redirect component to deal with
	 * weird GH Pages hosting. You cannot access the links
	 * directly, and must start with this one first. Good
	 *  for internal testing.
	 */
	return <Redirect to="/" />;
};

export default GHPages;
