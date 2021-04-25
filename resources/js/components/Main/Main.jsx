import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import s from './Main.module.scss'
import NewsBlock from './NewsBlock/NewsBlock'
import Loading from '../Common/Loading'
import axios from 'axios'

const Main = ({loggedIn, loggedUser}) => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch('/api/news')
        .then(response => {
            return response.json();
        })
        .then(news => {
            setNews(news)
            setLoading(false)
        });
    }, [])
    return (
        <div className={`content-width ${s['main-margin']} ${s.main}`}>
            {loading 
                ? <Loading /> 
                : 
                <>
                { (loggedIn && loggedUser && loggedUser.role == 1) &&
                <Link className="w-100" to="/add-news">
                    <button className="btn btn-success w-100">Add article</button>
                </Link> }
                { news.map(n => <NewsBlock props={n} isUser={loggedIn} loggedUser={loggedUser} key={n.id} />) }
                {!news.length && <div className={s['no-content']}><h2>No content added yet!</h2></div>}
                </>
            }
        </div>
    )
}

export default Main