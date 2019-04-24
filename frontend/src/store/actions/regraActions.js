import axios from "../../services/api";

import { GET_REGRAS } from "../actions/types";

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
