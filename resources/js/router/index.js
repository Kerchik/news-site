import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import NewsArticle from '../components/Main/NewsArticle/NewsArticle';
function Router(props) {
    return (
        <div>
            <BrowserRouter>
                <div className="bg-black">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/news" component={Main} />
                        <Route exact path="/news/:id" component={NewsArticle} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;