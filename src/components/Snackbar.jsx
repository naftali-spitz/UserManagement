import { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext } from "../context/SnackbarContext";

const CustomSnackbar = () => {
    const { open, message, severity, handleClose } = useContext(SnackbarContext);

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar