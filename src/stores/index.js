import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import * as localforage from 'localforage';
import userReducer from 'stores/userStore';

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: localforage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
});

export const persistor = persistStore(store);

export default store;
