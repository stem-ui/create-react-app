import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import singleSpaReact from 'single-spa-react';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter,
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [
  async function({ getAuthInfo, ...props }) {
    const authInfo = await getAuthInfo();
    reactLifecycles.mount({ authInfo, ...props });
  },
];

export const unmount = [reactLifecycles.unmount];

function domElementGetter() {
  return document.getElementById('portal-sub-ui');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
