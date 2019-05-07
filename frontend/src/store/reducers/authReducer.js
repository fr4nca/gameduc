import isEmpty from "../../utils/isEmpty";
import {
  SET_CURRENT_USER,
  SET_CURRENT_PROFILE,
  GET_ALL_ALUNOS,
  RELATORIO_PROFESSOR
} from "../actions/types";

const initalState = {
  isAuthenticated: false,
  user: {},
  profile: {},
  alunos: [],
  relatorio: {
    games: "",
    alunos: "",
    disciplinas: ""
  }
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_ALL_ALUNOS:
      return {
        ...state,
        alunos: action.payload
      };
    case RELATORIO_PROFESSOR:
      return {
        ...state,
        relatorio: {
          games: action.payload[0].games,
          alunos: action.payload[1].alunos,
          disciplinas: action.payload[2].disciplinas
        }
      };
    default:
      return state;
  }
};
