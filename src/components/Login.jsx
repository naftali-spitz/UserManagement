import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import propTypes from "prop-types";
import { SnackbarContext } from "../context/SnackbarContext";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";


const Login = ({ setIsLoggedIn, isOpen, onClose }) => {    
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false) 
    const { showSnackbar } = useContext(SnackbarContext)
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await login(userName, password)            
            setIsLoggedIn(true)
            navigate('/dashboard');
            setLoading(false)
        } catch (error) {
            setLoading(false)
            showSnackbar(error.message, 'error')
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />
                    <DialogActions>
                    <Button
                        type="submit"
                        color="primary"
                    >
                        Login
                    </Button>
                    </DialogActions>
                    {loading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-30px', marginLeft: '-30px'}} size='60px' />}
                </form>
            </DialogContent>
        </Dialog>
    )
}

Login.propTypes = {
    setIsLoggedIn: propTypes.func.isRequired,
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired
}

export default Login