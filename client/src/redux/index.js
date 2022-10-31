//import { combineReducers, createStore } from 'redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountSlice from './slicer/accountSlice';
import postSlice from './slicer/postSlice';
//import accountReducer from './accountReducer';
//import postReducer from './postReducer';

const persistConfig = {
    key: 'root',
    storage,
}

let rootReducer = combineReducers({
    account: accountSlice.reducer,
    post: postSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);	// redux-persist

const store = configureStore({
    reducer: persistedReducer ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

export default store;