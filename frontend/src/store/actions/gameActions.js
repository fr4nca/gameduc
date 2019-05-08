import axios from "../../services/api";
import {
  GET_GAMES,
  CREATE_GAME,
  GET_GAME,
  ADD_ALUNO,
  GET_RANKING,
  GET_ALUNOS,
  DELETE_ALUNO,
  CREATE_MESSAGE,
  GET_ERRORS,
  RELATORIO_PROFESSOR,
  GET_GAMES_ATIVOS
} from "./types";

import { deleteAlunoTarefas } from "./tarefaActions";

export const getGames = matricula => async dispatch => {
  try {
    const { data } = await axios.get(`/game/all/${matricula}`);

    dispatch({
      type: GET_GAMES,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getGamesAtivos = matricula => async dispatch => {
  try {
    const { data } = await axios.get(`/game/ativos/${matricula}`);

    dispatch({
      type: GET_GAMES_ATIVOS,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getGame = id => async dispatch => {
  try {
    const { data } = await axios.get(`/game/${id}`);

    dispatch({
      type: GET_GAME,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};

export const criarGame = game => async dispatch => {
  try {
    await axios.post("/game/criar", { ...game });

    dispatch({
      type: CREATE_GAME
    });
    dispatch({
      type: CREATE_MESSAGE,
      payload: { createGame: "Game criado com sucesso" }
    });

    dispatch(getGames(game.matricula));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const addAluno = (matricula, gameId) => async dispatch => {
  try {
    await axios.post("/game/addAlunoGame", { gameId, matricula });

    dispatch({
      type: ADD_ALUNO
    });

    dispatch({
      type: CREATE_MESSAGE,
      payload: { addAluno: "Aluno adicionado com sucesso" }
    });

    dispatch(getAlunos(gameId));
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: { msg: { error: "Aluno ja vinculado" }, status: 400 }
    });
  }
};

export const deleteAluno = (matricula, gameId) => async dispatch => {
  try {
    await axios.delete(`/game/deleteGameAluno/${gameId}/${matricula}`);

    dispatch({
      type: DELETE_ALUNO
    });

    dispatch({
      type: CREATE_MESSAGE,
      payload: { deleteAluno: "Aluno deletado com sucesso" }
    });

    dispatch(deleteAlunoTarefas(matricula, gameId));
    dispatch(getAlunos(gameId));
    dispatch(getRanking(gameId));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getAlunos = gameId => async dispatch => {
  try {
    const { data } = await axios.get(`/game/getAlunoGame/${gameId}`);

    dispatch({
      type: GET_ALUNOS,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getRanking = gameId => async dispatch => {
  try {
    const { data } = await axios.get(`/game/ranking/${gameId}`);
    dispatch({
      type: GET_RANKING,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
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
