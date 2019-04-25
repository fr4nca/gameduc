import {
  GET_REGRAS,
  ADD_REGRA,
  DELETE_REGRA,
  EDIT_REGRA
} from "../actions/types";

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
    case ADD_REGRA:
      return {
        ...state
      };
    case DELETE_REGRA:
      return {
        ...state
      };
    case EDIT_REGRA:
      return {
        ...state
      };
    default:
      return state;
  }
};
