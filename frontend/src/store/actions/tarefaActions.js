import axios from "../../services/api";

import { GET_TAREFAS } from "../actions/types";

export const getTarefas = id => async dispatch => {
  try {
    const { data } = await axios.get(`/tarefa/getTarefasByGame/${id}`);

    dispatch({
      type: GET_TAREFAS,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};
