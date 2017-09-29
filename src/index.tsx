import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './Containers/App';
import Hello from './Components/Hello';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Hello name="Me" enthusiasmLevel={1} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
