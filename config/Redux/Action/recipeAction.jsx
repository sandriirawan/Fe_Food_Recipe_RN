import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";


export const updateRecipes = (recipeId, formData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${EXPO_PUBLIC_API_URL}/recipes/${recipeId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "UPDATE_RECIPE", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_RECIPE", payload: error.message });
  }
};

export const getRecipes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/recipes`);
    const result = response.data.data;
    dispatch({ type: "GET_ALL_RECIPE", payload: result });
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesByid = (recipeId) => async (dispatch) => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/recipes/${recipeId}`);
    const result = response.data.data[0];
    dispatch({ type: "GET_DETAIL_RECIPE", payload: result });
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesByUsersid = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/recipes/users/${userId}`);
    const result = response.data.data;
    dispatch({ type: "GET_ALL_RECIPE", payload: result });
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecipes = (recipeId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${EXPO_PUBLIC_API_URL}/recipes/${recipeId}`
    );
    const result = response.data.data;
    dispatch({ type: "DELETE_RECIPE", payload: result });
  } catch (err) {
    console.error(err.message);
    alert("delete failed");
  }
};
