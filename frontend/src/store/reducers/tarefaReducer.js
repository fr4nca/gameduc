import {
  GET_TAREFAS,
  ADD_TAREFA,
  DELETE_TAREFA,
  VALIDAR_TAREFA,
  DELETE_ALUNO_TAREFAS,
  GET_TAREFAS_PENDENTES
} from "../actions/types";

const initalState = {
  tarefas: undefined
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_TAREFAS:
      return {
        ...state,
        tarefas: action.payload
      };
    case GET_TAREFAS_PENDENTES:
      return {
        ...state,
        tarefas: action.payload
      };
    case ADD_TAREFA:
      return {
        ...state
      };
    case DELETE_TAREFA:
      return {
        ...state
      };
    case VALIDAR_TAREFA:
      return {
        ...state
      };
    case DELETE_ALUNO_TAREFAS:
      return {
        ...state
      };
    default:
      return state;
  }
};
