import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppUserReducer from './AppUseReducer';
import reportWebVitals from './reportWebVitals';
import RangeSlider from './components/RangeSlider';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <RangeSlider className='bg-slate-800 h-40 w-80'/> */}
      {/* <App /> */}
    <AppUserReducer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
