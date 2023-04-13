import { useState } from "react";
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import Logo from '../../logo/logo';
import MainLogo from '../../../assets/images/AdvanatageAutoSales_Logo.png';
import CopyrightComponet from "../../copyright/CopyrightComponent";

import { ErrorMessageConst, FireStoreConst, SuccessMessageConst } from "../../../constants/AppConstants";
import { SignUpWithFirebaseAuth } from "../../../auth/auth";
import StorageService from "../../../database/services/StorageService";
import { serverTimestamp } from "firebase/firestore";

import ErrorMessage from "../../error/ErrorMessage";
import SuccessMessage from "../../success/SuccessMessage";


const SignUpForm = () => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [recieve, setRecieve] = useState(false); //Promotion checkbox 

    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const clearForm = () => {
        setfirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRecieve(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length <= 5 || confirmPassword <= 5) {
            setIsError(true);
            setIsSuccess(false);
            setErrMessage(ErrorMessageConst.INVALID_PASSWORD_LENGTH);
        }

        if (password !== confirmPassword) {
            setIsError(true);
            setIsSuccess(false);
            setErrMessage(ErrorMessageConst.PASSWORDS_DO_NOT_MATCH);
        }

        else {
           await SignUpWithFirebaseAuth(email, password);
            try {
                const docRef = await StorageService.createDoc(FireStoreConst.USER_DOC, {
                    timestamp: serverTimestamp(),
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    recieve: recieve,
                });
                console.log(SuccessMessageConst.CONSOLE_LOG_ADD_USER, docRef.id);
                clearForm();
                setIsSuccess(true);
                setIsError(false);
                setSuccessMessage(SuccessMessageConst.WELCOME_MESSAGE);
            } catch (e) {
                console.error(ErrorMessageConst.ERROR_USER_ADD, e);
                setIsError(true);
                setErrMessage(e.message);
                setIsSuccess(false);
            }
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Logo
                    url={MainLogo}
                    altDisplay="formLogo"
                />
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid
                        container
                        spacing={2}
                        columns={16}
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Grid
                            item
                            sm={8}
                            justifyContent="flex-end"
                        >
                            <TextField
                                margin="normal"
                                required
                                id="firstName"
                                label="First Name"
                                fullWidth={true}
                                value={firstName}
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid
                            item
                            sm={8}
                        >
                            <TextField
                                margin="normal"
                                required
                                id="lastName"
                                label="Last Name"
                                fullWidth={true}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        id="password2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={recieve}  // changed value to checked to enable the false state set after submission to uncheck if was checked originally.
                                onChange={(e) => setRecieve(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Be the first to receive exciting updates on new vehicles, offers and the latest news."
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>

                    {isError && <ErrorMessage message={errMessage} />}
                    {isSuccess && <SuccessMessage message={successMessage} />}

                    <Grid item container justifyContent="center">
                        <Link
                            onClick={() => {
                                navigate('/login')
                            }}
                            component="button"
                            variant="body2"
                            underline="hover"
                        >
                            Already have an account? Sign In
                        </Link>
                    </Grid>
                    &nbsp;
                    <CopyrightComponet />
                </Box>
            </Box>
        </Container>
    )
}

export default SignUpForm;