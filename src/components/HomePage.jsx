import { Box, Button, Container, Typography } from "@mui/material";
import Login from "./Login";
import React from "react";
import propTypes from "prop-types";

const Home = ({ setIsLoggedIn }) => {
    const [isModalOpen, setModalOpen] = React.useState(false);

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", marginTop: 4}}>
                <Typography variant="h3" gutterBottom>
                    Welcome to the User Dashboard
                </Typography>
                <Typography variant="body1" fontSize={"2rem"} sx={{ marginTop: 4}}>
                    Log in to start managing your users!
                </Typography>
                <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ marginTop: 4 }}>
                    Login
                </Button>
                <Login setIsLoggedIn={setIsLoggedIn} isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
            </Box>
        </Container>
    )
}

Home.propTypes = {
    setIsLoggedIn: propTypes.func.isRequired
}

export default Home