import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router'

function App() {
    return (
        <Router/>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
