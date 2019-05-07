import jwt_decode from "jwt-decode";

import setAuthToken from "../../utils/setAuthToken";

import { createMessage } from "./messagesActions";

import axios from "../../services/api";

import {
  SET_CURRENT_USER,
  SET_CURRENT_PROFILE,
  GET_ALL_ALUNOS,
  GET_ERRORS,
  RELATORIO_PROFESSOR
} from "./types";

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/user/login", userData);

    const { token } = res.data;

    localStorage.setItem("@Gameduc:userToken", token);

    setAuthToken(token);

    const decoded = jwt_decode(token);

    dispatch(setCurrentUser(decoded));

    dispatch(setCurrentProfile());
  } catch (e) {
    const error = {
      msg: e.response.data,
      status: e.response.status
    };
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};

export const registerUser = (user, history) => async dispatch => {
  try {
    await axios.post("/user/register", user);
    dispatch(createMessage({ registerSuccess: "Registrado com sucesso." }));
    history.push("/login");
  } catch (e) {
    const error = {
      msg: e.response.data,
      status: e.response.status
    };
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("@Gameduc:userToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
  dispatch({
    type: SET_CURRENT_PROFILE,
    payload: {}
  });
};

export const setCurrentProfile = () => async dispatch => {
  try {
    const { data } = await axios.get("/user/current");

    dispatch({
      type: SET_CURRENT_PROFILE,
      payload: data
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const getAllAlunos = () => async dispatch => {
  try {
    const { data } = await axios.get("/user/getAlunos");

    dispatch({
      type: GET_ALL_ALUNOS,
      payload: data
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const relatorioProfessor = matricula => async dispatch => {
  try {
    const { data } = await axios.get(`/user/relatorioProfessor/${matricula}`);

    dispatch({
      type: RELATORIO_PROFESSOR,
      payload: data
    });
  } catch (e) {
    console.log(e.response);
  }
};
