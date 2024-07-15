import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PERSIST, PURGE } from "redux-persist/es/constants";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

import authReducer from "./reducer/authReducer";
import themeReducer from "./reducer/themeReducer";
import commonReducer from "./reducer/commonReducer";
import fetchReducer from "./reducer/fetchReducers";
import breadcrumbsReducer from "./reducer/breadcrumbsReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["fetch"],
};

const rootReducer = combineReducers({
  user: authReducer,
  theme: themeReducer,
  common: commonReducer,
  fetch: fetchReducer,
  breadCrumbs: breadcrumbsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createStateSyncMiddleware({
        blacklist: [PERSIST, PURGE, "fetch"],
      })
    ),
});
initMessageListener(store);
export const persistor = persistStore(store);
