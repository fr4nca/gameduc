import axios from "../../services/api";

import {
  GET_TAREFAS,
  ADD_TAREFA,
  DELETE_TAREFA,
  VALIDAR_TAREFA,
  DELETE_ALUNO_TAREFAS,
  GET_TAREFAS_PENDENTES,
  CREATE_MESSAGE
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

export const getTarefasPendentes = matricula => async dispatch => {
  try {
    const { data } = await axios.get(`/tarefa/pendentes/${matricula}`);

    dispatch({
      type: GET_TAREFAS_PENDENTES,
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

    dispatch({
      type: CREATE_MESSAGE,
      payload: { addTarefa: "Tarefa adicionada com sucesso" }
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

    dispatch({
      type: CREATE_MESSAGE,
      payload: { deleteTarefa: "Tarefa deletada com sucesso" }
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

    dispatch({
      type: CREATE_MESSAGE,
      payload: { validateTarefa: "Tarefa validada com sucesso" }
    });

    dispatch(getTarefas(tarefa.tb_game_id));
    dispatch(getRanking(tarefa.tb_game_id));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const validarTarefaPendente = (tarefa, matricula) => async dispatch => {
  try {
    await axios.put(`/tarefa/updateValidado`, {
      tarefaId: tarefa.id,
      validado: tarefa.validado
    });

    dispatch({
      type: VALIDAR_TAREFA
    });

    dispatch({
      type: CREATE_MESSAGE,
      payload: { validateTarefa: "Tarefa validada com sucesso" }
    });

    dispatch(getTarefasPendentes(matricula));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const deleteAlunoTarefas = (matricula, gameId) => async dispatch => {
  try {
    await axios.delete(`/tarefa/aluno/${matricula}/${gameId}`);

    dispatch({
      type: DELETE_ALUNO_TAREFAS
    });

    dispatch(getTarefas(gameId));
    dispatch(getRanking(gameId));
  } catch (e) {
    console.log(e.response.data);
  }
};
