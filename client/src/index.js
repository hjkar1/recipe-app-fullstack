import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import recipeReducer from './store/reducers/recipeReducer';
import userReducer from './store/reducers/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  recipes: recipeReducer,
  user: userReducer
});

let store;

 // Use devtools only in development.
 // This check is required because composeDevTools is defined as dependency
 // instead of devDependency to make deploying the whole app easier.
if (process.env.NODE_ENV === 'development') {
  store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
} else {
  store = createStore(reducer, applyMiddleware(thunk));
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
