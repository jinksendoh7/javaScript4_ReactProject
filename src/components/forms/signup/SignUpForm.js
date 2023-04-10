import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from 'react-router-dom';
import CopyrightComponet from "../../copyright/CopyrightComponent";

import Logo from '../../logo/logo';
import MainLogo from '../../../assets/images/AdvanatageAutoSales_Logo.png';


const SignUpForm = () => {
    const [recieve, setRecieve] = useState(false); //Promotion checkbox 

    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        return ('')
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                onChange={(event) => setfirstName(event.target.value)}
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
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        label="Email Address"
                        value={''}
                        onChange={''}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password1"
                        label="Password"
                        value={''}
                        onChange={''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password2"
                        label="Confirm Password"
                        value={''}
                        onChange={''}
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
                        Sign In
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                    &nbsp;
                    <CopyrightComponet />
                </Box>
            </Box>
        </Container>
    )
}

export default SignUpForm;