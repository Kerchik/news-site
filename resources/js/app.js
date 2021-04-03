import React from 'react';
import ReactDOM from 'react-dom';
import ProviderComponent from './router/index'

function App() {
    return (
        <ProviderComponent />
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
