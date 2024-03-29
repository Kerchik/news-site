import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import s from './Profile.module.scss'
import requests from '../../api/requests';
import defaultAvatar from '../../img/user_default_avatar.png'
import edit from '../../img/edit.png'

const Profile = ({loggedIn, loggedUser}) => {
    let history = useHistory()
    const hiddenFileInput = useRef(null);
    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const [userData, setUserData] = useState(null)
    const [userActivity, setUserActivity] = useState(null)
    const [userDataIsChanged, setUserDataIsChanged] = useState(false)
    const [inputFieldsVisibility, setInputFieldsVisibility] = useState({
        name: false,
        email: false,
        password: false
    })
    const [errors, setErrors] = useState([])

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

    useEffect(() => {
        if (inputFieldsVisibility.name) nameInput.current.focus()
        if (inputFieldsVisibility.email) emailInput.current.focus()
    }, [inputFieldsVisibility.name, inputFieldsVisibility.email])

    const handleAvatarChange = (file) => {
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
            setErrors({
                ...errors,
                'avatar' : 'Please choose image!' 
            })
            console.error('Please choose image!')
            return
        }
        if (errors['avatar']) {
            delete errors['avatar']
        }
        setUserData({
            ...userData,
            avatar: URL.createObjectURL(file),
            avatarObject: file,
        })
        setUserDataIsChanged(true)
    }

    const handleAvatarChangeClick = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click();
    }

    const handleFieldChange = (e, property) => {
        e.preventDefault()
        setUserData({
            ...userData,
            [property]: e.target.value
        })
        setUserDataIsChanged(true)
    }

    const saveChanges = (e) => {
        e.preventDefault()
        setErrors([])
        var form = document.forms.namedItem("fileinfo")
        const formData = new FormData(form);
        formData.append("avatar", userData.avatarObject);
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        requests.changeUserData(formData, loggedUser.id)
        .then(() => {
            history.push('/profile')
        })
        .catch(error => {
            if (error.response.status == 422) {
                console.error(error.response.data.errors)
                setErrors(error.response.data.errors)
            }
        })
    }

    return (
        <div className={`content-width row mt main py-4 `}>
            { (errors.name || errors.email || errors.avatar) &&
            <div className="alert alert-danger w-100" role="alert">
                <div>Error</div>
                {
                    Object.entries(errors).map(([key, value]) => (
                        <div key={key}>{value}</div>
                    ))
                }
            </div>
            }
            <form className="col-12 row mx-0" encType="multipart/form-data" name="fileinfo">
                <h2 className={`col-12 ${s['below-md-col']}`}>Profile:</h2>
                <div className="col-md-2">
                    <div className={s["img__wrap"]}>
                        <img src={userData?.avatar || defaultAvatar} className={s['avatar']}/>
                        <div onClick={handleAvatarChangeClick} className={`${s["img__description_layer"]} cursor-pointer`}>
                            <p className={s["img__description"]}>Change avatar</p>
                            
                        </div>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="d-none"
                            ref={hiddenFileInput}
                            onChange={(e) => {
                                if (!e.target.files[0]) return
                                handleAvatarChange(e.target.files[0])
                            }} 
                        />
                    </div>
                </div>
                <div className={`col-md-10 px-0 ${s['user-data']}`}>
                    <div className={`col-12 ${s['h-36']}`}>
                        <div className={s['info-block']}>
                            <span>Username: </span> 
                            {!inputFieldsVisibility.name &&
                                <>
                                    {userData?.name}
                                    <img 
                                        onClick={() => setInputFieldsVisibility({...inputFieldsVisibility, name: true})} 
                                        src={edit} 
                                        className={`${s['edit-button']} ml-2 cursor-pointer align-bottom`}
                                    />
                                </>
                            }
                            {inputFieldsVisibility.name && 
                                <input 
                                    value={userData?.name}
                                    ref={nameInput}
                                    className={s['line-height-inital']}
                                    onChange={(e) => handleFieldChange(e, 'name')}
                                    onBlur={() => setInputFieldsVisibility({...inputFieldsVisibility, name: false})}
                                />
                            }
                        </div>
                    </div>
                    <div className={`col-12 ${s['h-36']}`}>
                        <div className={s['info-block']}>
                            <span>Email: </span> 
                            {!inputFieldsVisibility.email &&
                                <>
                                    {userData?.email}
                                    <img 
                                        onClick={() => setInputFieldsVisibility({...inputFieldsVisibility, email: true})} 
                                        src={edit} 
                                        className={`${s['edit-button']} ml-2 cursor-pointer align-bottom`}
                                    />
                                </>
                            }
                            {inputFieldsVisibility.email && 
                                <input 
                                    value={userData?.email}
                                    ref={emailInput}
                                    className={s['line-height-inital']}
                                    onChange={(e) => handleFieldChange(e, 'email')}
                                    onBlur={() => setInputFieldsVisibility({...inputFieldsVisibility, email: false})}
                                />
                            }
                        </div>
                    </div>
                    <div className={`col-12 ${s['h-36']}`}>
                        <div className={s['info-block']}>
                            <span>Role: </span>
                            {userData && userRoles[userData.role].name}
                        </div>
                    </div>
                    <div className={`col-12 ${s['h-36']}`}>
                        <div className={s['info-block']}>
                            <span>Registration date: </span>
                            {userData?.created_at}
                        </div>
                    </div>
                </div>
                <div className="w-100 row mx-0 my-3">
                    <div className={`col-md-6 ${s['below-md-col']}`}>
                        <div><h4>Articles count:</h4></div>
                        <div>{userActivity?.articlesCount}</div>
                    </div>
                    <div className={`col-md-6 ${s['below-md-col']}`}>
                        <div><h4>Comments count:</h4></div>
                        <div>{userActivity?.commentsCount}</div>
                    </div>
                </div>
                <div className={`col-12 d-flex justify-content-end flex-wrap ${s['action-buttons-block']}`}>
                    <button
                        type="button"
                        onClick={() => history.push('/profile/password-change')} 
                        className={`btn btn-primary mr-2`}
                    >
                        Change password
                    </button>
                    <button 
                        onClick={saveChanges} 
                        className={`btn btn-success`}
                        disabled={!userDataIsChanged}
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