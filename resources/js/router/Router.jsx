import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux'
import {changeIsLoggedIn, changeLoggedUser} from '../redux/authReducer'
import axios from 'axios'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import Main from '../components/Main/Main';
import About from '../components/About/About';
import NewsArticle from '../components/Main/NewsArticle/View';
import NewsArticleEdit from '../components/Main/NewsArticle/Edit';
import AddNews from '../components/Main/AddNews/AddNews';
import AdminPage from '../components/Admin/AdminPage';
import Register from '../components/Login/Register';
import Login from '../components/Login/Login';
import Profile from '../components/User/Profile';
import NotFound from '../components/Common/NotFound';
import PasswordChange from '../components/User/PasswordChange';

const Router = ({loggedIn, loggedUser, changeIsLoggedIn, changeLoggedUser}) => {
    const [appIsReady, setAppIsReady] = useState(false) 
    useEffect(() => {
        axios.get('/api/user').then(({data}) => {
            changeIsLoggedIn(true)
            changeLoggedUser(data)
        }).catch((error) => {
            console.error(error)
        }).finally(() => {
            setAppIsReady(true)
        })
    }, [])
    return (
        <BrowserRouter>
            <div className="bg-black min-vh">
                <Header loggedIn={loggedIn} changeIsLoggedIn={changeIsLoggedIn} changeLoggedUser={changeLoggedUser} loggedUser={loggedUser} />
                {appIsReady &&
                <Switch>
                    <Route exact path="/"><Main loggedIn={loggedIn} loggedUser={loggedUser}/></Route>
                    <Route exact path="/news"><Main loggedIn={loggedIn} loggedUser={loggedUser}/></Route>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/news/:id"><NewsArticle loggedIn={loggedIn} /></Route>
                    <Route exact path="/news/edit/:id"><NewsArticleEdit loggedIn={loggedIn} loggedUser={loggedUser} /></Route>
                    <Route exact path="/add-news"><AddNews loggedIn={loggedIn} loggedUser={loggedUser}/></Route>
                    <Route exact path="/admin-page"><AdminPage loggedIn={loggedIn} loggedUser={loggedUser}/></Route>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login"><Login loggedIn={loggedIn} changeIsLoggedIn={changeIsLoggedIn} changeLoggedUser={changeLoggedUser} /></Route>
                    <Route exact path="/profile"><Profile loggedIn={loggedIn} loggedUser={loggedUser}/></Route>
                    <Route exact path="/profile/password-change"><PasswordChange loggedIn={loggedIn} loggedUser={loggedUser} changeIsLoggedIn={changeIsLoggedIn} changeLoggedUser={changeLoggedUser}/></Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
                }
            </div>
            <Footer />
        </BrowserRouter>
    )
}

Router.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
    changeIsLoggedIn: PropTypes.func.isRequired,
    changeLoggedUser: PropTypes.func.isRequired,
}

const mapStateToProps = ({auth}) => {
    return {
        loggedIn: auth.loggedIn,
        loggedUser: auth.user,
    }
}

const RouterContainer = connect(mapStateToProps,{changeIsLoggedIn, changeLoggedUser})(Router)
export default RouterContainer;