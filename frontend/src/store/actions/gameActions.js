import axios from "../../services/api";
import {
  GET_GAMES,
  CREATE_GAME,
  GET_GAME,
  ADD_ALUNO,
  GET_RANKING
} from "./types";

export const getGames = matricula => async dispatch => {
  try {
    const { data } = await axios.post("/game/", { matricula });

    dispatch({
      type: GET_GAMES,
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

    dispatch(getGames(game.matricula));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const addAluno = ({ gameId, matricula }) => async dispatch => {
  try {
    await axios.post("/game/addAlunoGame", { gameId, matricula });

    dispatch({
      type: ADD_ALUNO
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
