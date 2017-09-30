import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import { RootState } from './types/index';
import reducer from './reducers/index';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Redux.Store<RootState> = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
const s = store.getState();
console.log(`store state: ${s}`);
registerServiceWorker();
