import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
// import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  timeout: null,
  blacklist: ['profile', 'offers', 'password', 'chat', 'bank', 'vehicles'],
};

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Persist: Redux-persist
const pReducer = persistReducer(
  persistConfig,
  rootReducer,
);

// Redux: Store
const store = createStore(
  pReducer,
  applyMiddleware(sagaMiddleware),
);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {
  store,
  persistor,
};
