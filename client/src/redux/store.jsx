import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginReducer from "./slices/loginSlice";
import eventReducer from "./slices/eventSlice";
import eventsReducer from "./slices/eventsSlice";
import holidaysReducer from "./slices/holidaysSlice";

// Configure Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"], // Add the reducers you want to persist here
};

// Combine your reducers
const rootReducer = combineReducers({
  login: loginReducer,
  event: eventReducer,
  events: eventsReducer,
  holidays: holidaysReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

// Create Redux Persist persister
const persistor = persistStore(store);

export { store, persistor };
