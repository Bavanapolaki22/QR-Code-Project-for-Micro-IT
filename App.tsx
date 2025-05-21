import React from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header py-6">
        <h1 className="text-3xl font-bold">QR Code Generator App</h1>
      </header>
      <main className="py-8">
        <QRCodeGenerator />
      </main>
      <footer className="py-4 text-center text-gray-500">
        <p>© 2023 QR Code Generator</p>
      </footer>
    </div>
  );
}

export default App;