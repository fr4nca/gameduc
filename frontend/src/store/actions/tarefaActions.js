import axios from "../../services/api";

import { GET_TAREFAS, ADD_TAREFA } from "../actions/types";

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

export const addTarefa = tarefa => async dispatch => {
  try {
    await axios.post(`/tarefa/`, { ...tarefa });

    dispatch({
      type: ADD_TAREFA
    });

    dispatch(getTarefas(tarefa.gameId));
  } catch (e) {
    console.log(e.response.data);
  }
};
