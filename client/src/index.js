import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
//import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './assets/styles/index.css';
import App from './App';
import stores from './redux';

//const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={stores.store}>
    <PersistGate loading={null} persistor={stores.persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

