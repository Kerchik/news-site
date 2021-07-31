import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Loading from '../Common/Loading'

const AdminPage = ({loggedIn, loggedUser}) => {
    let history = useHistory()

    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState(false)

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
    return (
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
                            <td>{user.role}</td>
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
    )
}

export default AdminPage