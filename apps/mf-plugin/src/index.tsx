import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const { appName = 'root' } = process.env.productConfig as any;

const root = createRoot(document.querySelector(`#${appName}`) as Element);

root.render(<App />);
