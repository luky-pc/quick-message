import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import commonCss from "./static/style/common.css";
import RouterMap from "./router/routerMap";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<RouterMap />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();