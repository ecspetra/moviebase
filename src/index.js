import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './firebase';
import history from "./history";

import { Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router history={history}>
        <Routes>
            <Route exact path="/" element={<App/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    </Router>
);

reportWebVitals();
