import React from "react";
import MakeDrawer from "./makeToolBar";

const MainDoc = () => {
	const section1 = [
		{
			to: "to1",
			text: "dummylink1",
			title: "dum dum winy one one",
			content:
				"here is some cool stuff about dummy link1 here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1"
		},
		{
			to: "to2",
			text: "dummylink2",
			title: "dum dum winy tu tu",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		},
		{
			to: "to3",
			text: "dummylink3",
			title: "dum dum winy tree tree",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		}
	];
	const section2 = [
		{
			to: "to6",
			text: "ur mom gey",
			title: "Reasons ur mom gey",
			content:
				"bottom of page?bottom of page?bottom of page?bottom of page?bottom of page?bottom of page?bottom of page?bottom of page?bottom of page?"
		},
		{
			to: "to4",
			text: "dummylink4",
			title: "dum dum winy foo foo",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		},
		{
			to: "to5",
			text: "dummylink5",
			title: "dum dum winy fy fy",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		}
	];
	return <MakeDrawer sections={[section1, section2]} />;
};

export default MainDoc;
