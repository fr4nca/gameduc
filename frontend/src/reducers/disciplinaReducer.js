import {
  CREATE_DISCIPLINA,
  GET_DISCIPLINAS,
  GET_DISCIPLINAS_PROFESSOR,
  VINCULATE_DISCIPLINA_PROFESSOR
} from "../actions/types";

const initalState = {
  disciplinas: [],
  disciplinasProf: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_DISCIPLINAS:
      return {
        ...state,
        disciplinas: action.payload
      };
    case CREATE_DISCIPLINA:
      return {
        ...state
      };
    case GET_DISCIPLINAS_PROFESSOR:
      return {
        ...state,
        disciplinasProf: action.payload
      };
    case VINCULATE_DISCIPLINA_PROFESSOR:
      return {
        ...state
      };
    default:
      return state;
  }
};
