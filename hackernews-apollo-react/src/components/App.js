import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import LinkList from './LinkList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LinkList />
      </header>
    </div>
  );
}

export default App;
