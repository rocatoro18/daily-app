import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {DailyApp} from './DailyApp';
import './styles.css';

// LA PALABRA PROVIDER SIGNIFICA QUE SE PROPORCIONA CIERTA
// INFORMACION

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DailyApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
