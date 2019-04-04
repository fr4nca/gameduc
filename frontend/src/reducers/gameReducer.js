import { GET_GAMES } from "../actions/types";

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
    default:
      return state;
  }
};
