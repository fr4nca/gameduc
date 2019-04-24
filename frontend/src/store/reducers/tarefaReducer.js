import { GET_TAREFAS } from "../actions/types";

const initalState = {
  tarefas: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_TAREFAS:
      return {
        ...state,
        tarefas: action.payload
      };
    default:
      return state;
  }
};
