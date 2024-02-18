import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { moveApi } from "./move/api";
import { gamesApi } from "./games/api";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "gamesApi",
  ],
};

const rootReducer = combineReducers({
  [moveApi.reducerPath]: moveApi.reducer,
  [gamesApi.reducerPath]: gamesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      moveApi.middleware,
      gamesApi.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;