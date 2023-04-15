import { useState } from "react";
import { Button, TextField, Link, Grid, Box, Container, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import Logo from '../../logo/logo';
import MainLogo from '../../../assets/images/AdvanatageAutoSales_Logo.png';
import CopyrightComponet from "../../copyright/CopyrightComponent";
import ErrorMessage from "../../error/ErrorMessage";
import SnackbarElement from "../../elements/snack-bar/SnackbarElement";

import { reset } from "../../../database/write";

import { ErrorMessageConst, SuccessMessageConst } from "../../../constants/AppConstants";

const ResetForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
       setIsError(false);
       setIsSuccess(false);
        try {   
               const emailTrue = await reset(email);
                if (emailTrue) {
                    setIsSuccess(true);
                    setSuccessMessage(SuccessMessageConst.RESET_EMAIL_MESSAGE);
                    setIsError(false);
                }
                else{
                    setIsError(true);
                    setErrorMessage(ErrorMessageConst.EMAIL_DOES_NOT_EXIST);
                    setIsSuccess(false);
                }
          
        } catch (error) {
            setIsError(true);
            setErrorMessage(ErrorMessageConst.EMAIL_DOES_NOT_EXISTS);
            setIsSuccess(false);
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
                    marginTop: 25,
                    display: "flex",
                    justifyContent: 'center',
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
                        spacing={0}
                        columns={16}
                        sx={{ mt: 2 }}
                    >
                        <Typography
                            margin="normal"
                            textAlign='center'
                            sx={{ fontSize: 17 }}
                        >
                            {'Lost your password? Please enter your email address. You will receive a link to create a new password via email.'}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        spacing={0}
                        columns={16}
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{ mt: 1, mb:3 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            type="email"
                            id="emailAddress"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid
                        container
                        spacing={0}
                        columns={16}
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ mb: 2, width: 300 }}
                        >
                            Reset
                        </Button>
                    </Grid>

                   

                    <Grid item container justifyContent="center" sx={{ mb: 1 }}>
                        <Link
                            onClick={() => {
                                navigate('/login')
                            }}
                            component="button"
                            variant="body2"
                            underline="hover"
                        >
                            Take me to Sign-in
                        </Link>
                    </Grid>
                    <CopyrightComponet />
                </Box>
            </Box>
            {isSuccess && <SnackbarElement isOpen={isSuccess} message={successMessage} />}
            {isError && <SnackbarElement isOpen={isError} message={errorMessage} />}
        </Container>
    )
}
export default ResetForm;