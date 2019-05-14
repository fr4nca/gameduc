import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";

import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const compose = composeWithDevTools({ realtime: true });

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
