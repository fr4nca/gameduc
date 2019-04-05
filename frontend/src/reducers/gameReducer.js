import { GET_GAMES, CREATE_GAME } from "../actions/types";

const initalState = {
  games: []
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
    default:
      return state;
  }
};
