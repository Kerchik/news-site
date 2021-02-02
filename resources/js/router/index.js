import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
function Router(props) {
    return (
        <div>
            <BrowserRouter>
                <div className="bg-black">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Main} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;