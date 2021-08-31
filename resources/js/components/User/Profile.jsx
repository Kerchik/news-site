import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import s from './Profile.module.scss'

const Profile = ({loggedIn, loggedUser}) => {
    const [userData, setUserData] = useState(null)
    const [userActivity, setUserActivity] = useState(null)

    const userRoles = {
        1: {
            id: 1,
            key: 1,
            name: 'Admin'
        },
        5: {
            id: 2,
            key: 5,
            name: 'Author'
        },
        10: {
            id: 3,
            key: 10,
            name: 'Regular User'
        },
    }

    useEffect(() => {
        if (!loggedIn) {
            history.push('/')
            console.error('You are not logged in!')
            return
        }
        fetch(`/api/get-user-activity/${loggedUser.id}`)
        .then(response => {
            return response.json();
        })
        .then(({articlesCount, commentsCount}) => {
            setUserActivity({
                articlesCount: articlesCount,
                commentsCount: commentsCount,
            })
        })
        const [year, month, day]= loggedUser.created_at.split(/[- :]/);
        setUserData({
            ...loggedUser,
            created_at: `${day}.${month}.${year}`
        })
    }, [])
    return (
        <div className={`content-width mt main p-4`}>
            <h2 className={s['pl-15']}>Profile:</h2>
            <div className="col-12">
                <span>Username: </span> 
                {userData?.name}
            </div>
            <div className="col-12">
                <span>Email: </span> 
                {userData?.email}
            </div>
            <div className="col-12">
                <span>Role: </span>
                {userData && userRoles[userData.role].name}
            </div>
            <div className="col-12">
                <span>Registration date: </span>
                {userData?.created_at}
            </div>
            <div className="col-xl-6">
                <div>Articles count: </div>
                <div>{userActivity?.articlesCount}</div>
            </div>
            <div className="col-xl-6">
                <div>Comments count: </div>
                <div>{userActivity?.commentsCount}</div>
            </div>
        </div>
    )
}

Profile.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
}

export default Profile