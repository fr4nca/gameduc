import axios from "../../services/api";

import {
  ADD_REGRA,
  GET_REGRAS,
  DELETE_REGRA,
  EDIT_REGRA,
  CREATE_MESSAGE
} from "../actions/types";
import { getTarefas } from "./tarefaActions";
import { getRanking } from "./gameActions";

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

    dispatch({
      type: CREATE_MESSAGE,
      payload: { addRegra: "Regra adicionada com sucesso" }
    });

    dispatch(getRegras(regra.gameId));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const deleteRegra = ({ id, tb_game_id }) => async dispatch => {
  try {
    await axios.delete(`/regra/${id}`);

    dispatch({
      type: DELETE_REGRA
    });
    dispatch({
      type: CREATE_MESSAGE,
      payload: { deleteRegra: "Regra deletada com sucesso" }
    });
    dispatch(getRegras(tb_game_id));
    dispatch(getTarefas(tb_game_id));
    dispatch(getRanking(tb_game_id));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const editRegra = regra => async dispatch => {
  try {
    await axios.put(`/regra/${regra.id}`, { ...regra });

    dispatch({
      type: EDIT_REGRA
    });
    dispatch({
      type: CREATE_MESSAGE,
      payload: { editRegra: "Regra editada com sucesso" }
    });
    dispatch(getRegras(regra.tb_game_id));
  } catch (e) {
    console.log(e.response.data);
  }
};
