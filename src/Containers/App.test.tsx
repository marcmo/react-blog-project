import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RootState } from '../types';
import App from './App';
import configureStore from 'redux-mock-store';

const middlewares: Array<any> = [];
const mockStore: any = configureStore(middlewares);

it('renders without crashing', () => {
  const initialState: RootState = {
    postState: {
      entities: [],
      ids: [],
    },
    filterState: { filter: '' }
  };
  const store = mockStore(initialState);
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>,
    div);
});
