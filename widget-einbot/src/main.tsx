import React from 'react'
import ReactDOM from 'react-dom/client'
import EinBotWidget from './EinBotWidget/EinBotWidget.tsx'
import './index.css'

const urlParams = new URLSearchParams(window.location.search);

if (document?.body) {
    const bgColor = urlParams.get('bgColor');
    document.body.style.backgroundColor = bgColor || 'white';
}

const colorScheme = urlParams.get('colorScheme') as 'light' | 'dark' | undefined;
const direction = urlParams.get('direction') as 'row' | 'column' | undefined;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EinBotWidget colorScheme={colorScheme} direction={direction} />
  </React.StrictMode>,
);

