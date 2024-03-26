import React from 'react';
import { createRoot } from 'react-dom/client';
import * as UAuthWeb3Modal from '@uauth/web3modal'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import providerOptions from './services/providerOptions'
import { Web3ModalProvider } from './services/Web3ModalContext'

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ModalProvider
      cacheProvider={true}
      providerOptions={providerOptions}
      onNewWeb3Modal={UAuthWeb3Modal.registerWeb3Modal}
    >
      <App />
    </Web3ModalProvider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
