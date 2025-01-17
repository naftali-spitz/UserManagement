import { useEffect, useState, useContext } from "react";
import { fetchUsers, addUser, updateUser, deleteUser, logout } from "../api";
import propTypes from "prop-types";
import UserForm from "./UserForm";
import { SnackbarContext } from "../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Card,
    CardContent,
} from "@mui/material";
import Grid from "@mui/system/Grid"

const UserManagemenDashboard = ({ setIsLoggedIn }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [selectedUsers, setSelectedUsers] = useState(new Set())
    const { showSnackbar } = useContext(SnackbarContext)
    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {            
            try {
                const data  = await fetchUsers();
                setUsers(data);
                
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getUsers()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        logout()
        navigate('/')
    }

    const handleSelectUser = (userId) => {
        const newSelectedUsers = new Set(selectedUsers);
        if (newSelectedUsers.has(userId)) {
            newSelectedUsers.delete(userId)
        } else {
            newSelectedUsers.add(userId)
        }
        setSelectedUsers(newSelectedUsers)
    }

    const handleAddUser = async (newUser) => {
        try {
            setLoading(true)
            await addUser(newUser);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            setLoading(false)
            showSnackbar('User added successfully!', 'success')
        } catch (error) {
            setError(error.message)
            showSnackbar('Error adding user', 'error')
        }
    }


    const handleEditUser = async (updatedUser) => {

        const userId = currentUser._id;
        
        try {
            setLoading(true)
            await updateUser(userId, updatedUser);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            setLoading(false)
            showSnackbar('User updated successfully!', 'success')
        } catch (error) {
            setError(error.message)
            showSnackbar('Error updating user', 'error')
        }
    }
    

    const handleAddUserModal = () => {
        console.log('currentUser:', currentUser);
        setCurrentUser(null)
        setIsModalOpen(true)
    }

        
    const handleDeleteUser = async (id) => {
        try {
            setLoading(true)
            await deleteUser(id);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            setLoading(false)
            showSnackbar('User deleted successfully!', 'success')
        } catch (error) {
            setError(error.message)
            showSnackbar('Error deleting user', 'error')
        }
    }

    const handleMultiDelete = async () => {
        try{ 
        for (const id of selectedUsers) {
            await handleDeleteUser(id)
        }
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
        setSelectedUsers(new Set())
        } catch (error) {
            setError(error.message)
            showSnackbar('Error deleting user', 'error')
        }
    }

    if (loading) return <CircularProgress style={{margin: 'auto'}} />
    if (error) return <div>{error}</div>

    return (
        <Card>
            <Grid container justifyContent="flex-end">
                <Button variant="contained" color="secondary" onClick={handleLogout} style={{marginRight: '20px', marginTop : '20px'}}>Logout</Button>
            </Grid>
            <CardContent>
            <Typography variant="h4" gutterBottom>User Management Dashboard</Typography>
            <Grid container justifyContent="flex-end" style={{marginBottom: '20px'}}>
                <Button variant="contained" onClick={handleAddUserModal}>Add User</Button>
                <Button variant="contained" color="secondary" onClick={handleMultiDelete} style={{marginLeft: '10px'}} disabled={selectedUsers.size === 0}>Delete User</Button>
            </Grid>
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Creation Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={user._id} style={{backgroundColor: index % 2 === 0 ?  '#f9f9f9' : '#fff'}}>
                            <TableCell>
                                <input type="checkbox"
                                    checked={selectedUsers.has(user._id)}
                                    onChange={() => handleSelectUser(user._id)}
                                />
                            </TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.createdAt}</TableCell>
                            <TableCell>
                                <Button variant="contained"color="primary" onClick={() => {
                                    setCurrentUser(user);
                                    setIsModalOpen(true);
                                }}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

            <UserForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={currentUser ? handleEditUser : handleAddUser}
                user={currentUser}
            />
            </CardContent>
        </Card>
    )
}

UserManagemenDashboard.propTypes = {
    setIsLoggedIn: propTypes.func.isRequired  
}

export default UserManagemenDashboard
