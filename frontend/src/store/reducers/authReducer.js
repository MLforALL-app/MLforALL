const initState = {
	authError: null
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_ERROR":
			console.log("Login error, watch where u step big fella");
			return { ...state, authError: "Login Failed" };
		case "LOGIN_SUCCESS":
			console.log("Login success, you're in chief");
			return { ...state, authError: null };
		case "SIGN_OUT_SUCCESS":
			console.log("Peace man, signout success");
			return state
		default:
			return state;
	}
};

export default authReducer;
