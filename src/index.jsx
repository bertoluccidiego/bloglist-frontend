import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';

import App from './App';

import RootContainer from './styles/RootContainer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <RootContainer>
        <App />
      </RootContainer>
    </Provider>
  </BrowserRouter>
);
