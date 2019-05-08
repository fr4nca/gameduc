import {
  GET_GAMES,
  CREATE_GAME,
  GET_GAME,
  ADD_ALUNO,
  GET_RANKING,
  GET_ALUNOS,
  DELETE_ALUNO,
  RELATORIO_PROFESSOR,
  GET_GAMES_ATIVOS
} from "../actions/types";

const initalState = {
  games: undefined,
  gamesAtivos: undefined,
  game: {},
  ranking: [],
  alunos: [],
  relatorio: undefined
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload
      };
    case CREATE_GAME:
      return {
        ...state
      };
    case GET_GAME:
      return {
        ...state,
        game: action.payload
      };
    case ADD_ALUNO:
      return {
        ...state
      };
    case DELETE_ALUNO:
      return {
        ...state
      };
    case GET_ALUNOS:
      return {
        ...state,
        alunos: action.payload
      };
    case GET_RANKING:
      return {
        ...state,
        ranking: action.payload
      };
    case RELATORIO_PROFESSOR:
      return {
        ...state,
        relatorio: {
          games: action.payload[0].games,
          alunos: action.payload[1].alunos,
          disciplinas: action.payload[2].disciplinas,
          tarefas: action.payload[3].tarefas
        }
      };
    case GET_GAMES_ATIVOS:
      return {
        ...state,
        gamesAtivos: action.payload
      };
    default:
      return state;
  }
};
