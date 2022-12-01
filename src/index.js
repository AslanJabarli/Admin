import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'antd/dist/antd.css';
import './assets/main.scss'
import './assets/css/font-awesome/css/font-awesome.min.css'
import { store } from '../src/redux/store/store';
import "./i18n";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
         <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
