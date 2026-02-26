import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import themeReducer from "../slices/themeSlice";
import uiReducer from "../slices/uiSlice";
import filterReducer from "../slices/filterSlice";
import leadPerformanceReducer from "../slices/leadPerformanceSlice";
import leadReducer from "../slices/leadSlice";
import featureReducer from "../redux/featureSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  ui: uiReducer,
  filter: filterReducer,
  leadPerformance: leadPerformanceReducer,
  lead: leadReducer,
  feature: featureReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;