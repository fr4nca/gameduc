import axios from "../../services/api";

import { ADD_REGRA, GET_REGRAS } from "../actions/types";

export const getRegras = id => async dispatch => {
  try {
    const { data } = await axios.get(`/regra/${id}`);

    dispatch({
      type: GET_REGRAS,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};

export const addRegra = regra => async dispatch => {
  try {
    await axios.post(`/regra/`, { ...regra });

    dispatch({
      type: ADD_REGRA
    });
  } catch (e) {
    console.log(e.response.data);
  }
};

export const deleteRegra = id => async dispatch => {
  try {
    await axios.post(`/regra/`);

    dispatch({
      type: ADD_REGRA
    });
  } catch (e) {
    console.log(e.response.data);
  }
};
