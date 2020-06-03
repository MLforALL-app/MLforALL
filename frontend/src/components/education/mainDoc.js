import React from "react";
import MakeDrawer from "./makeToolBar";

const MainDoc = () => {
	const section1 = [
		{
			to: "to1",
			text: "dummylink1",
			title: "dum dum winy one one",
			preimg: "",
			postimg: "",
			imgurl: "",
			content:
				"here is some cool stuff about dummy link1 here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1here is some cool stuff about dummy link1"
		},
		{
			to: "to2",
			text: "dummylink2",
			title: "dum dum winy tu tu",
			preimg: "",
			postimg: "",
			imgurl: "",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		},
		{
			to: "to3",
			text: "dummylink3",
			title: "dum dum winy tree tree",
			preimg: "",
			postimg: "",
			imgurl: "",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		}
	];
	const section2 = [
		{
			to: "to6",
			text: "ur mom gey",
			title: "Reasons ur mom gey",
			preimg: "stuff before an image",
			postimg: "text after an image",
			imgurl:
				"data:image/png;base64,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",
			content: ""
		},
		{
			to: "to4",
			text: "dummylink4",
			title: "dum dum winy foo foo",
			preimg: "",
			postimg: "",
			imgurl: "",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		},
		{
			to: "to5",
			text: "dummylink5",
			title: "dum dum winy fy fy",
			preimg: "",
			postimg: "",
			imgurl: "",
			content:
				"here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2here is some even more cool stuff about dummy link2"
		}
	];
	return <MakeDrawer sections={[section1, section2]} />;
};

export default MainDoc;
