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
import userReducer, { logout } from 'stores/userStore';
import reposReducer from 'stores/reposStore';

const appReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  repos: reposReducer,
});

const persistConfig = {
  key: 'root',
  storage: localforage,
};

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    persistConfig.storage.removeItem(`persist:${persistConfig.key}`);
    state = undefined;
  }

  return appReducer(state, action);
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
