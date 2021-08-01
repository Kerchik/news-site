import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import requests from '../../api/requests'
import Loading from '../Common/Loading'

const AdminPage = ({loggedIn, loggedUser}) => {
    let history = useHistory()
    Modal.setAppElement('#root')

    const customStyles = {
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
    const [modalIsOpen,setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        setLoading(true)
        if (!loggedIn || (loggedUser && loggedUser.role!=1)) {
            history.push('/')
            console.error('You do not have permission to see this page')
            return
        }
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
    }, [])

    const openModalWindow = (e, user) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true)
        setCurrentUser(user)
    }
    const closeModal = () => {
        setIsOpen(false)
        setCurrentUser(null)
    }
    const submitNewUserRole = (e) => {
        e.preventDefault();
        e.stopPropagation();
        requests.changeUserRole(currentUser, currentUser.id)
        .then(() => {
            closeModal()
            setCurrentUser(null)
            history.go(0)
        })
    }
    const changeCurrentUserRole = (e) => {
        setCurrentUser({
            ...currentUser,
            role: +e.target.value
        })
    }
    return (
        <>
            <div className="content-width main justify-content-center p-4">
                {loading 
                    ? <Loading /> 
                    : 
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.length
                        ?
                        usersList.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.role}<button className="btn btn-primary ml-2" onClick={(e) => openModalWindow(e, user)}>Change</button></td>
                            </tr>
                        ))
                        : 
                        <tr>
                            <td colSpan="2">No users found</td>
                        </tr>
                        }
                    </tbody>
                </table>
                }
            </div>
            { modalIsOpen &&
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="form-group mb-3">
                        <label for="role-select">Choose role for this user:</label>
                        <select id="role-select" className="form-control" value={currentUser?.role} onChange={changeCurrentUserRole}>
                            <option value="1">Admin</option>
                            <option value="10">Regular User</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className={`btn btn-success modal-button`} onClick={submitNewUserRole}>Save</button>
                        <button className={`btn btn-danger modal-button ml-2`} onClick={closeModal}>Cancel</button>
                    </div>
                </Modal>
            }
        </>
    )
}

export default AdminPage