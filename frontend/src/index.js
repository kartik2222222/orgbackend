import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Ensure the 'root' element exists in the HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Error: The element with id "root" was not found.');
}
