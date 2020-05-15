const initState = {
	projects: [
		{
			id: "1",
			title: "The Bee Movie",
			content:
				"According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Ooming! Hang on a second."
		},
		{
			id: "2",
			title: "2008 Humor",
			content:
				"Gr8 b8, m8. I rel8, str8 appreci8, and congratul8. I r8 this b8 an 8/8. Plz no h8, I’m str8 ir8. Cre8 more, can’t w8. We should convers8, I won’t ber8, my number is 8888888, ask for N8. No calls l8 or out of st8. If on a d8, ask K8 to loc8. Even with a full pl8, I always have time to communic8 so don’t hesit8"
		},
		{
			id: "3",
			title: "Helicopter Copypasta",
			content:
				"I sexually Identify as an Attack Helicopter. Ever since I was a boy I dreamed of soaring over the oilfields dropping hot sticky loads on disgusting foreigners. People say to me that a person being a helicopter is Impossible and I’m fucking retarded but I don’t care, I’m beautiful. I’m having a plastic surgeon install rotary blades, 30 mm cannons and AMG-114 Hellfire missiles on my body. From now on I want you guys to call me “Apache” and respect my right to kill from above and kill needlessly. If you can’t accept me you’re a heliphobe and need to check your vehicle privilege. Thank you for being so understanding."
		}
	]
};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			console.log("Created project", action.project);
	}
	return state;
};

export default projectReducer;
