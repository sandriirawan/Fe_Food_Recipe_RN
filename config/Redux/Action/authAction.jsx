import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";


export const login = (data) => async (dispatch) => {
    try {
      const response = await axios.post("http://192.168.1.16:3000/users/login", data);
      console.log(response.data.data.token);
      dispatch({ type: "LOGIN", payload: response.data });
    } catch (error) {
      dispatch({ type: "LOGIN", payload: error.message });
    }
  };