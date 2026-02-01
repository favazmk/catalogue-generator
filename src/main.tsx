import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CatalogueProvider } from './context/CatalogueContext.tsx'

console.log('Main.tsx executing...');
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Failed to find root element');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <CatalogueProvider>
        <App />
      </CatalogueProvider>
    </React.StrictMode>,
  )
}
