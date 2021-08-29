import React from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import Router from './Router'

function ProviderComponent() {
    return (
        <div>
            <Provider store={store}>
                <Router />
            </Provider>
        </div>
    );
}

export default ProviderComponent;