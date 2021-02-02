import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import './App.css';

function App() {
    return (
      <div className="bg-black">
        <Header />
        <Main />
      </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
