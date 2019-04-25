import { GET_TAREFAS, ADD_TAREFA } from "../actions/types";

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
    case ADD_TAREFA:
      return {
        ...state
      };
    default:
      return state;
  }
};
