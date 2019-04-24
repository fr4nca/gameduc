import {
  GET_GAMES,
  CREATE_GAME,
  GET_GAME,
  ADD_ALUNO,
  GET_RANKING
} from "../actions/types";

const initalState = {
  games: [],
  game: {},
  ranking: []
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
    case GET_RANKING:
      return {
        ...state,
        ranking: action.payload
      };
    default:
      return state;
  }
};
