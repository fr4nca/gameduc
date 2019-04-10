import { GET_GAMES, CREATE_GAME, GET_GAME } from "../actions/types";

const initalState = {
  games: [],
  game: {}
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
    default:
      return state;
  }
};
