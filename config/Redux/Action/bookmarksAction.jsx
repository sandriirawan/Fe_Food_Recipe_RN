import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";



const createBookmarks = (recipeId,userId) => async (dispatch) => {
  try {
    const response = await axios.post(`${EXPO_PUBLIC_API_URL}/bookmarks`, {
        recipes_id: recipeId,
        users_id: userId,
      });
    dispatch({ type: "CREATE_BOOKMARk", payload: response.data });
  } catch (error) {
    dispatch({ type: "CREATE_BOOKMARk", payload: error.message });
  }
};


const deleteBookmarks = (bookmark_id) => async (dispatch) => {
    try {
      const liked = await axios.delete(
        `${EXPO_PUBLIC_API_URL}/bookmarks/${bookmark_id}`
      );
      const result = liked.data.data;
      dispatch({ type: "DELETE_BOOKMARK", payload: result });
    } catch (err) {
      console.error(err.message);
      alert("delete failed");
    }
  };

  export const getBookmarks = (userId) => async (dispatch) => {
    try {
      const response = await axios.get(`${EXPO_PUBLIC_API_URL}/bookmarks/${userId}`);
      const result = response.data.data;
      dispatch({ type: "GET_ALL_BOOKMARk", payload: result });
    } catch (error) {
      console.error(error);
    }
  };



export  {createBookmarks,deleteBookmarks};
export default getBookmarks;




