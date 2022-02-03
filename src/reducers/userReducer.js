const initialState = {
  name: "",
  phone: "",
  email: "",
  role: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone,
        email: action.payload.email,
        role: action.payload.role,
      };

    case "LOG_OUT":
      return state;

    default:
      return state;
  }
};
