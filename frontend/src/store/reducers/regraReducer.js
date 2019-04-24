import { GET_REGRAS } from "../actions/types";

const initalState = {
  regras: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_REGRAS:
      return {
        ...state,
        regras: action.payload
      };
    default:
      return state;
  }
};
