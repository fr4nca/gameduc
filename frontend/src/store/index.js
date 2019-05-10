import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth"]
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  initialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === "prod" ||
      process.env.NODE_ENV === "production" ||
      !window.__REDUX_DEVTOOLS_EXTENSION__
      ? a => a
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
