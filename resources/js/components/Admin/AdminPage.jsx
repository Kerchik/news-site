import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'
import Loading from '../Common/Loading'
import RoleModal from './Modal/RoleModal';
import DeleteUserModal from './Modal/DeleteUserModal';

const AdminPage = ({loggedIn, loggedUser}) => {
    let history = useHistory()

    const modalStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          padding               : '50px'
        }
    };

    const [usersList, setUsersList] = useState([])
    const [roleModalIsOpen,setRoleModalIsOpen] = useState(false);
    const [deleteModalIsOpen,setDeleteModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

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
        setLoading(true)
        if (!loggedIn || (loggedUser && loggedUser.role!=1)) {
            history.push('/')
            console.error('You do not have permission to see this page')
            return
        }
        loadUsers()
    }, [])

    const loadUsers = async () => {
        fetch(`/api/get-users`)
        .then(response => {
            return response.json();
        }).then((data) => {
            setUsersList(data)
            setLoading(false)
        }).catch((e) => {
            console.error(e)
            setLoading(false)
        })
    }

    const openRoleModalWindow = (e, user) => {
        e.preventDefault();
        e.stopPropagation();
        setRoleModalIsOpen(true)
        setCurrentUser(user)
    }
    const openDeleteModalWindow = (e, user) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteModalIsOpen(true)
        setCurrentUser(user)
    }
    return (
        <>
            <div className="content-width main justify-content-center p-4 mt">
                {loading 
                    ? <Loading /> 
                    :
                <div className="overflow-x-auto w-100">
                    <table className="table table-bordered text-nowrap">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.length
                            ?
                            usersList.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>
                                        {userRoles[user.role].name}
                                        {user.id === 1 || <button className="btn btn-primary ml-2" onClick={(e) => openRoleModalWindow(e, user)}>Change</button>}
                                    </td>
                                    <td>{user.id === 1 || <button className="btn btn-danger ml-2" onClick={(e) => openDeleteModalWindow(e, user)}>Delete</button>}</td>
                                </tr>
                            ))
                            : 
                            <tr>
                                <td colSpan="2">No users found</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
                }
                <div className="w-100">
                    <h4>Roles description:</h4>
                        <h5>Admin:</h5>
                        <ul>
                            <li>
                                Has rights to edit and delete and comment existing articles;
                            </li>
                            <li>
                                Add new articles;
                            </li>
                            <li>
                                Change roles of other users;
                            </li>
                            <li>
                                Delete other users;
                            </li>
                            <li>
                                Watch and change their profiles;
                            </li>
                        </ul>
                        <h5>Author:</h5>
                        <ul>
                            <li>
                                Add new articles;
                            </li>
                            <li>
                                Comment existing articles;
                            </li>
                            <li>
                                Watch and change their profiles;
                            </li>
                        </ul>
                        <h5>Regular user:</h5>
                        <ul>
                            <li>
                                Comment existing articles;
                            </li>
                            <li>
                                Watch and change their profiles;
                            </li>
                        </ul>
                        <h5>Guest/Unauthorized</h5>
                        <ul>
                            <li>
                                Read existing articles;
                            </li>
                        </ul>
                </div>
            </div>
            { roleModalIsOpen &&
                <RoleModal 
                    roleModalIsOpen={roleModalIsOpen}  
                    currentUser={currentUser}
                    userRoles={userRoles}
                    modalStyles={modalStyles}
                    setRoleModalIsOpenCallback={setRoleModalIsOpen}
                    loadUsersCallback={loadUsers}
                    setCurrentUserCallback={setCurrentUser}
                    setLoadingCallback={setLoading}
                />
            }
            { deleteModalIsOpen &&
                <DeleteUserModal 
                    deleteModalIsOpen={deleteModalIsOpen}
                    currentUser={currentUser}
                    modalStyles={modalStyles}
                    setDeleteModalIsOpenCallback={setDeleteModalIsOpen}
                    loadUsersCallback={loadUsers}
                    setCurrentUserCallback={setCurrentUser}
                    setLoadingCallback={setLoading}
                />
            }
        </>
    )
}

AdminPage.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
}

export default AdminPage