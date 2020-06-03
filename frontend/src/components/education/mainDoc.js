import React from "react";
import MakeDrawer from "./makeToolBar";

const MainDoc = () => {
	const sections = [
		{
			to: "to1",
			text: "dummylink1",
			content:
				"here is some cool stuff about dummy link1 here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1"
		},
		{
			to: "to2",
			text: "dummylink2",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		},
		{
			to: "to3",
			text: "dummylink2",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		},
		{
			to: "to4",
			text: "dummylink2",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		},
		{
			to: "to5",
			text: "dummylink2",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		}
	];
	return <MakeDrawer sections={sections} />;
};

export default MainDoc;
