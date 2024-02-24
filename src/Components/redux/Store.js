import { legacy_createStore as  createStore } from 'redux';
import ShopReducer from './reducers/ShopReducer';

// Redux DevTools Extension setup
const reduxDevToolsExtension =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Create store with DevTools Extension
const store = createStore(
  ShopReducer,
  /* preloadedState, */
  reduxDevToolsExtension // Add DevTools as an enhancer
);

export default store;
