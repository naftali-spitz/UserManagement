import { createContext, useState } from "react";
import PropTypes from 'prop-types';

const SnackbarContext = createContext({
    open: false,
    message: '',
    severity: 'success',
    handleClose: () => {},
})

const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleClose = () => setOpen(false)

    const showSnackbar = (message, severity = 'success') => {
        setMessage(message)
        setSeverity(severity)
        setOpen(true)
    }

    return (
        <SnackbarContext.Provider
            value={{
                open,
                message,
                severity,
                handleClose,
                showSnackbar
            }}
        >
            {children}
        </SnackbarContext.Provider>
    )
}

SnackbarProvider.propTypes = {
    children: PropTypes.node
}

export { SnackbarProvider, SnackbarContext }