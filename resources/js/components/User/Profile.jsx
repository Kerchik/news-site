import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import s from './Profile.module.scss'
import requests from '../../api/requests';
import defaultAvatar from '../../img/user_default_avatar.png'

const Profile = ({loggedIn, loggedUser}) => {
    let history = useHistory()
    const hiddenFileInput = useRef(null);
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

    const handleAvatarChange = (file) => {
        setUserData({
            ...userData,
            avatar: URL.createObjectURL(file),
            avatarObject: file,
        })
    }

    const handleAvatarChangeClick = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click();
    }

    const saveChanges = (e) => {
        e.preventDefault()
        var form = document.forms.namedItem("fileinfo")
        const formData = new FormData(form);
        formData.append("avatar", userData.avatarObject);
        requests.changeUserData(formData, loggedUser.id)
        .then(() => {
            history.push('/profile')
        })
    }

    return (
        <div className={`content-width mt main p-4`}>
            <form className="row w-100" encType="multipart/form-data" name="fileinfo">
                <h2 className="col-12">Profile:</h2>
                <div className="col-xl-2">
                    <div className={s["img__wrap"]}>
                        <img src={userData?.avatar || defaultAvatar} className={s['avatar']}/>
                        <div onClick={handleAvatarChangeClick} className={`${s["img__description_layer"]} cursor-pointer`}>
                            <p className={s["img__description"]}>Change avatar</p>
                            
                        </div>
                        <input
                            type="file"
                            className="d-none"
                            ref={hiddenFileInput}
                            onChange={(e) => {
                                if (!e.target.files[0]) return
                                handleAvatarChange(e.target.files[0])
                            }} 
                        />
                    </div>
                </div>
                <div className="col-xl-10 px-0">
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
                </div>
                <div className="col-xl-6">
                    <div>Articles count: </div>
                    <div>{userActivity?.articlesCount}</div>
                </div>
                <div className="col-xl-6">
                    <div>Comments count: </div>
                    <div>{userActivity?.commentsCount}</div>
                </div>
                <div className="col-12 d-flex justify-content-end">
                    <button 
                        onClick={saveChanges} 
                        className={`btn btn-success`}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

Profile.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
}

export default Profile