import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogActions, TextField, Button, DialogContent } from "@mui/material";
import PropTypes from "prop-types";

const UserForm = ({ isOpen, onClose, onSubmit, user }) => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setFullName(user.fullName);
            setEmail(user.email);
            setPassword(user.password);
        } else {
            setUsername('');
            setFullName('');
            setEmail('');
            setPassword('');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username,
            fullName,
            email,
            password: user ? user.password : password
        }

        onSubmit(userData);
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                label="username"
                type="text"
                fullWidth
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                margin="dense"
                label="fullName"
                type="text"
                fullWidth
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                margin="dense"
                label="email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                margin="dense"
                label="password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={user}
                required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

UserForm.propTypes = {
    user: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default UserForm;