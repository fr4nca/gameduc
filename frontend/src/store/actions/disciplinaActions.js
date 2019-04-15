import axios from "../../services/api";

import {
  GET_DISCIPLINAS,
  CREATE_DISCIPLINA,
  GET_DISCIPLINAS_PROFESSOR,
  VINCULATE_DISCIPLINA_PROFESSOR
} from "./types";

export const getDisciplinas = () => async dispatch => {
  try {
    const { data } = await axios.get("/disciplina");

    dispatch({
      type: GET_DISCIPLINAS,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};

export const criarDisciplina = ({ nome }) => async dispatch => {
  try {
    await axios.post("/disciplina", { nome });

    dispatch({
      type: CREATE_DISCIPLINA
    });

    dispatch(getDisciplinas());
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getDisciplinasProfessor = matricula => async dispatch => {
  try {
    const { data } = await axios.get(`/disciplina/discProf/${matricula}`);

    dispatch({
      type: GET_DISCIPLINAS_PROFESSOR,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};

export const vincularDisciplina = (
  matricula,
  disciplinaId
) => async dispatch => {
  try {
    await axios.post("/disciplina/addDiscProf", {
      disciplinaId,
      matricula
    });

    dispatch({
      type: VINCULATE_DISCIPLINA_PROFESSOR
    });
    dispatch(getDisciplinasProfessor(matricula));
  } catch (e) {
    console.log(e.response.data);
  }
};
