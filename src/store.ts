import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };

// Purpose: This file is responsible for creating and configuring the Redux store.

// configureStore: A function provided by Redux Toolkit that creates a store with good defaults, like enabling the Redux DevTools extension and setting up middleware like redux-thunk.
// reducer: The root reducer of the application, which combines all the individual slices of the state.
