import axios from "axios";
import { API_URL } from "@env";



const createLikeds = (recipeId,userId) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/likeds`, {
        recipes_id: recipeId,
        users_id: userId,
      });
    dispatch({ type: "CREATE_LIKED", payload: response.data });
  } catch (error) {
    dispatch({ type: "CREATE_LIKED", payload: error.message });
  }
};


const deleteLikeds = (liked_id) => async (dispatch) => {
  try {
    const liked = await axios.delete(
      `${API_URL}/likeds/${liked_id}`
    );
    const result = liked.data.data;
    dispatch({ type: "DELETE_LIKED", payload: result });
  } catch (err) {
    console.error(err.message);
    alert("delete failed");
  }
};

export const getLikeds = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/likeds/${userId}`);
    const result = response.data.data;
    dispatch({ type: "GET_ALL_LIKED", payload: result });
  } catch (error) {
    console.error(error);
  }
};

export { createLikeds, deleteLikeds }; 
export default getLikeds;



