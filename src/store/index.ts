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
import { testApi } from "./test/api";
import { moveApi } from "./move/api";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const rootReducer = combineReducers({
  [testApi.reducerPath]: testApi.reducer,
  [moveApi.reducerPath]: moveApi.reducer,
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
      testApi.middleware,
      moveApi.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;