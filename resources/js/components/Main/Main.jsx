import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import s from './Main.module.scss'
import NewsBlock from './NewsBlock/NewsBlock'
import Loading from '../Common/Loading'

const Main = ({loggedIn, loggedUser}) => {
    const [news, setNews] = useState([])
    const [newsCount, setNewsCount] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)
    const [lastPage, setLastPage] = useState(null)
    const [loading, setLoading] = useState(true)

    const isCancelled = useRef(false);
    
    useEffect(() => {
        loadItems()

        return () => {
            isCancelled.current = true;
        }
    }, [])

    const loadItems = async () => {
        setLoading(true)
        fetch('/api/news')
        .then(response => {
            return response.json();
        })
        .then((news) => {
            if (!isCancelled.current) {
                fetchActions(news)
            }
        });
    }

    const getNextItems = () => {
        setLoading(true)
        fetch(`/api/news?page=${currentPage+1}`)
        .then(response => {
            return response.json();
        })
        .then((news) => {
            fetchActions(news)
        });
    }

    const getPreviousItems = () => {
        setLoading(true)
        fetch(`/api/news?page=${currentPage-1}`)
        .then(response => {
            return response.json();
        })
        .then((news) => {
            fetchActions(news)
        });
    }

    const fetchActions = ({data, total, current_page, last_page}) => {
        setNews(data)
        setNewsCount(total)
        setCurrentPage(current_page)
        setLastPage(last_page)
        setLoading(false)
    }

    return (
        <main className={`content-width ${s['main-margin']} ${s.main}`}>
            {loading 
                ? <Loading /> 
                : 
                <>
                    { (loggedIn && loggedUser && (loggedUser.role === 1 || loggedUser.role === 5)) &&
                    <Link className="w-100" to="/add-news">
                        <button className="btn btn-success w-100">Add article</button>
                    </Link> }
                    { news.map(n => <NewsBlock reloadItemsCallback={loadItems} articleInfo={n} isUser={loggedIn} loggedUser={loggedUser} key={n.id} />) }
                    {!news.length && <div className={s['no-content']}><h2>No content added yet!</h2></div>}
                    {newsCount !== 0 && 
                        <ul className="w-100 d-flex justify-content-center pagination">
                            { currentPage > 1 &&
                                <li className="page-item cursor-pointer">
                                    <span className="page-link" onClick={getPreviousItems}>Previous</span>
                                </li>
                            }
                            { currentPage < lastPage &&
                                <li className="page-item cursor-pointer">
                                    <span className="page-link" onClick={getNextItems}>Next</span>
                                </li>
                            }
                        </ul>
                    }
                </>
            }
        </main>
    )
}

Main.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
}

export default Main