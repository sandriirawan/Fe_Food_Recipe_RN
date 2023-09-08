const initialState = {
    user: [],
    userDetail: [],
  };
  
  const recipeReducer = (state = initialState, action) => {
    if (action.type === "GET_ALL_USER") {
      return {
        ...state,
        user: action.payload,
      };
    } else if (action.type === "GET_DETAIL_USER") {
      return {
        ...state,
        userDetail: [action.payload],
      };
    } else if (action.type === "UPDATE_RUSER") {
      return state;
    } else if (action.type === "REGISTER") {
      return state;
    } else if (action.type === "LOGIN") {
      return state;
    } else {
      return state;
    }
  };
  
  export default recipeReducer;
  