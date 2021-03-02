import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import s from './Main.module.css'
import NewsBlock from './NewsBlock/NewsBlock'

const Main = () => {
    const [news, setNews] = useState([])
    // const news = [
    //     {
    //         id: 1,
    //         title: 'Loremipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    //         content: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    //         photo: 'https://cnet2.cbsistatic.com/img/-e95qclc6pwSnGE2YccC2oLDW_8=/1200x675/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg'
    //     },
    //     {
    //         id: 2,
    //         title: 'Title',
    //         content: 'Content Content Content',
    //         photo: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg'
    //     },
    //     {
    //         id: 3,
    //         title: 'Title',
    //         content: 'Content Content Content',
    //         photo: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg'
    //     }
    // ]
    
    useEffect(() => {
        fetch('/api/news')
        .then(response => {
            return response.json();
        })
        .then(news => {
            setNews(news)
        });
    }, [])
    return (
        <div className={`content-width mt ${s.main}`}>
            <Link className="w-100" to="/add-news">
                <button className="btn btn-success w-100">Add article</button>
            </Link>
            { news.map(n => <NewsBlock props={n} key={n.id} />) }
            {!news.length && <div className={s['no-content']}><h2>No content added yet!</h2></div>}
        </div>
    )
}

export default Main