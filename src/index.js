import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StaffContext } from './Context/staff_context';
import { StaffProvider } from './Context/staff_context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <div>
 <BrowserRouter>
    <StaffProvider>
    <App />
    </StaffProvider>
    </BrowserRouter>
    </div>,

  document.getElementById('root')
);
