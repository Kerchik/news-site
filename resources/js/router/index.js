import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import About from '../components/About/About';
import NewsArticle from '../components/Main/NewsArticle/View';
import NewsArticleEdit from '../components/Main/NewsArticle/Edit';
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
                        <Route exact path="/about" component={About} />
                        <Route exact path="/news/:id" component={NewsArticle} />
                        <Route exact path="/news/edit/:id" component={NewsArticleEdit} />
                        <Route exact path="/add-news" component={AddNews} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;