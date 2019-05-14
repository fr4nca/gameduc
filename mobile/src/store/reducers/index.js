import { combineReducers } from "redux";

import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import disciplinaReducer from "./disciplinaReducer";
import tarefaReducer from "./tarefaReducer";
import regraReducer from "./regraReducer";
import errorsReducer from "./errorsReducer";
import messagesReducer from "./messagesReducer";

export default combineReducers({
  auth: authReducer,
  game: gameReducer,
  disciplina: disciplinaReducer,
  tarefa: tarefaReducer,
  regra: regraReducer,
  errors: errorsReducer,
  messages: messagesReducer
});
