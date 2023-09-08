const initialState = {
    liked: [],
    likedDetail: [],
  };
  
  const likedsReducer = (state = initialState, action) => {
    if (action.type === "GET_ALL_LIKED") {
      return {
        ...state,
        liked: action.payload,
      };
    } else if (action.type === "GET_DETAIL_LIKED") {
      return {
        ...state,
        likedDetail: [action.payload],
      };
    } else if (action.type === "CREATE_LIKED") {
      return state;
    } else if (action.type === "DELETE_LIKED") {
      return state;
    } else {
      return state;
    }
  };
  
  export default likedsReducer;
  