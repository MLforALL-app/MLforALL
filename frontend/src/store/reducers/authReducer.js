const initSent = {
  reset: null,
  verify: null,
};

const initState = {
  authError: null,
  sent: initSent,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: "Login Failed" };
    case "LOGIN_SUCCESS":
      return { ...state, authError: null };
    case "SIGN_OUT_SUCCESS":
      return state;
    case "SIGNUP_SUCCESS":
      return { ...state, authError: null };
    case "SIGNUP_ERROR":
      return { ...state, authError: action.err.message };
    case "SEND_VERIFY":
      return { ...state, sent: { ...initSent, verify: "yay" } };
    case "SEND_VERIFY_ERROR":
      return { ...state, sent: { ...initSent, verify: "noo" } };
    case "SEND_RESET":
      return { ...state, sent: { ...initSent, reset: "yay" } };
    case "SEND_RESET_ERROR":
      return { ...state, sent: { ...initSent, reset: "noo" } };
    case "UPDATE_USER_INFO":
      return state;
    case "UPDATE_USER_INFO_ERROR":
      return state;
    default:
      return state;
  }
};

export default authReducer;
