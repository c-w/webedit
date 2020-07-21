import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import * as localforage from 'localforage';
import loadingReducer from 'stores/loadingStore';
import userReducer from 'stores/userStore';
import reposReducer from 'stores/reposStore';

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  repos: reposReducer,
});

const persistConfig = {
  key: 'root',
  storage: localforage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
