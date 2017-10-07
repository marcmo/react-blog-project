import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import { RootState } from './types';
import reducer from './reducers';
import rootSaga from './sagas';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({});
const saga = createSagaMiddleware();

const store: Redux.Store<RootState> = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger, saga)
  )
);
saga.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
