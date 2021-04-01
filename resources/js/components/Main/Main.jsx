import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import s from './Main.module.css'
import NewsBlock from './NewsBlock/NewsBlock'
import Loading from '../Common/Loading'
import axios from 'axios'

const Main = () => {
    const [news, setNews] = useState([])
    const [user, setUser] = useState(null)
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
        axios.get('/api/user').then(({data}) => {
            setUser(data.name)
        })
    }, [])
    return (
        <div className={`content-width mt ${s.main}`}>
            {loading 
                ? <Loading /> 
                : 
                <>
                <Link className="w-100" to="/add-news">
                    <button className="btn btn-success w-100">Add article</button>
                </Link>
                { news.map(n => <NewsBlock props={n} isUser={user} key={n.id} />) }
                {!news.length && <div className={s['no-content']}><h2>No content added yet!</h2></div>}
                </>
            }
        </div>
    )
}

export default Main