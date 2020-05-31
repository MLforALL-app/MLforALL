const initSent = {
	reset: null,
	verify: null
};

const initState = {
	authError: null,
	sent: initSent
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_ERROR":
			//console.log("Login error, watch where u step big fella");
			return { ...state, authError: "Login Failed" };
		case "LOGIN_SUCCESS":
			//console.log("Login success, you're in chief");
			return { ...state, authError: null };
		case "SIGN_OUT_SUCCESS":
			//console.log("Peace man, signout success");
			return state;
		case "SIGNUP_SUCCESS":
			//console.log("Welcome aboard, signup success");
			return { ...state, authError: null };
		case "SIGNUP_ERROR":
			//console.log("mmm signup error, you have to know a brother");
			return { ...state, authError: action.err.message };
		case "SEND_VERIFY":
			return { ...state, sent: { ...initSent, verify: "yay" } };
		case "SEND_VERIFY_ERROR":
			return { ...state, sent: { ...initSent, verify: "noo" } };
		case "SEND_RESET":
			return { ...state, sent: { ...initSent, reset: "yay" } };
		case "SEND_RESET_ERROR":
			return { ...state, sent: { ...initSent, reset: "noo" } };
		default:
			return state;
	}
};

export default authReducer;
