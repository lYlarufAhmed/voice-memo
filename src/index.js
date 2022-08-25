import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { store } from 'redux/store';
// import { storage } from 'service';

import 'swiper/swiper-bundle.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'react-day-picker/lib/style.css';

// preloading
import './polyfills';

import App from './App';
import theme from './MuiTheme';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

// Initialize store
// let initialState = {};
// if (process.env.NODE_ENV === 'development') {
//   const data = storage.getItem('unverified_faithmo_signup_data');
//   if (data) {
//     initialState = {
//       form: { RegisterChurchForm: { values: data } },
//     };
//   }
// }
// const store = configureStore(initialState);

SwiperCore.use([Navigation, Pagination]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {/* <BrowserRouter> */}
          <ErrorBoundary>
            <App churchIndex="demo" />
          </ErrorBoundary>
          {/* </BrowserRouter> */}
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
