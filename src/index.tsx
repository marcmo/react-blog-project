import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import { StoreState } from './types/index';
import reducer from './reducers/index';
// import App from './containers/App';
import Hello from './containers/Hello';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Redux.Store<StoreState> = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
