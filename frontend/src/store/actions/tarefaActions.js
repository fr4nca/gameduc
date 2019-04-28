import axios from "../../services/api";

import {
  GET_TAREFAS,
  ADD_TAREFA,
  DELETE_TAREFA,
  VALIDAR_TAREFA
} from "./types";

import { getRanking } from "./gameActions";

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
    dispatch(getRanking(tarefa.gameId));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const deleteTarefa = tarefa => async dispatch => {
  try {
    await axios.delete(`/tarefa/${tarefa.id}`);

    dispatch({
      type: DELETE_TAREFA
    });

    dispatch(getTarefas(tarefa.tb_game_id));
    dispatch(getRanking(tarefa.tb_game_id));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const validarTarefa = tarefa => async dispatch => {
  try {
    await axios.put(`/tarefa/updateValidado`, {
      tarefaId: tarefa.id,
      validado: tarefa.validado
    });

    dispatch({
      type: VALIDAR_TAREFA
    });

    dispatch(getTarefas(tarefa.tb_game_id));
    dispatch(getRanking(tarefa.tb_game_id));
  } catch (e) {
    console.log(e.response.data);
  }
};
