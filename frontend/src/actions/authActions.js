import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

import { SET_CURRENT_USER, SET_CURRENT_PROFILE } from "./types";

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/login",
      userData
    );

    const { token } = res.data;

    localStorage.setItem("@Gameduc:userToken", token);

    setAuthToken(token);

    const decoded = jwt_decode(token);

    dispatch(setCurrentUser(decoded));

    dispatch(setCurrentProfile());
  } catch (e) {
    console.log(e);
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("@Gameduc:userToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};

export const setCurrentProfile = () => async dispatch => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/user/current");

    dispatch({
      type: SET_CURRENT_PROFILE,
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
