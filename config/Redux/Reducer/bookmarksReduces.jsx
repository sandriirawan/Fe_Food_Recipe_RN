const initialState = {
    bookmark: [],
    bookmarkDetail: [],
  };
  
  const bookmarksReducer = (state = initialState, action) => {
    if (action.type === "GET_ALL_BOOKMARk") {
      return {
        ...state,
        bookmark: action.payload,
      };
    } else if (action.type === "GET_DETAIL_BOOKMARk") {
      return {
        ...state,
        bookmarkDetail: [action.payload],
      };
    } else if (action.type === "CREATE_BOOKMARk") {
      return state;
    } else if (action.type === "DELETE_BOOKMARk") {
      return state;
    } else {
      return state;
    }
  };
  
  export default bookmarksReducer;
  