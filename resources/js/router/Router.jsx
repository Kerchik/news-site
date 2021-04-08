import React, {useEffect, useState} from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux'
import {changeIsLoggedIn, changeLoggedUser} from '../redux/authReducer'
import axios from 'axios'
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import About from '../components/About/About';
import NewsArticle from '../components/Main/NewsArticle/View';
import NewsArticleEdit from '../components/Main/NewsArticle/Edit';
import AddNews from '../components/Main/AddNews/AddNews';
import Register from '../components/Login/Register';
import Login from '../components/Login/Login';

const Router = ({loggedIn, loggedUser, changeIsLoggedIn, changeLoggedUser}) => {
    const [appIsReady, setAppIsReady] = useState(false) 
    useEffect(() => {
        axios.get('/api/user').then(({data}) => {
            changeIsLoggedIn(true)
            changeLoggedUser(data)
        }).catch((error) => {
            //console.error(error)
        }).finally(() => {
            setAppIsReady(true)
        })
    }, [])
    return (
        <BrowserRouter>
            <div className="bg-black">
                <Header loggedIn={loggedIn} changeIsLoggedIn={changeIsLoggedIn} changeLoggedUser={changeLoggedUser} />
                {appIsReady &&
                <Switch>
                    <Route exact path="/"><Main loggedIn={loggedIn} /></Route>
                    <Route exact path="/news"><Main loggedIn={loggedIn} /></Route>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/news/:id"><NewsArticle loggedIn={loggedIn} loggedUser={loggedUser} /></Route>
                    <Route exact path="/news/edit/:id"><NewsArticleEdit loggedIn={loggedIn}/></Route>
                    <Route exact path="/add-news"><AddNews loggedIn={loggedIn} loggedUser={loggedUser}/></Route>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login"><Login changeIsLoggedIn={changeIsLoggedIn} changeLoggedUser={changeLoggedUser} /></Route>
                </Switch>
                }
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        loggedIn: auth.loggedIn,
        loggedUser: auth.user,
    }
}

const RouterContainer = connect(mapStateToProps,{changeIsLoggedIn, changeLoggedUser})(Router)
export default RouterContainer;