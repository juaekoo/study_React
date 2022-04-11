import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === 'alert닫기') {
    state = false;
    return state;
  } else {
    return state;
  }
}

let 초기값 = [
  { id : 0, name : '멋진신발', quan : 2 }, 
  { id : 1, name : '제법멋진신발', quan : 6 }
]

// state=기본state -> ES6 default parameter 문법
function reducer(state = 초기값, 액션) {
  if( 액션.type === '항목추가') {

    let copy = [...state];
    copy.push(액션.payload);
    return copy;

  } else if (액션.type === '수량증가') {

    let copy = [...state];
    copy[0].quan++;
    return copy;

  } else if (액션.type === '수량감소') {

    let copy = [...state];
    copy[0].quan--;
    return copy;
    
  } else {
    return state;
  }
}

// let store = createStore(reducer);
// reducer를 더 만든 경우
let store = createStore(combineReducers({reducer, reducer2}));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 아래는 
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);