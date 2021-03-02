import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import NewsArticle from '../components/Main/NewsArticle/NewsArticle';
import AddNews from '../components/Main/AddNews/AddNews';
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
                        <Route exact path="/add-news" component={AddNews} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;