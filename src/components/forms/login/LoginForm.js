import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/usersSlice';
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Container } from '@mui/material';

import * as database from '../../../database'
import * as auth from '../../../auth';
import { FireStoreConst } from '../../../constants/AppConstants';
import { RoutesConst } from '../../../constants/AppConstants';

import CopyrightComponet from '../../copyright/CopyrightComponent';
import SnackbarElement from '../../elements/snack-bar/SnackbarElement';
import Logo from '../../logo/logo';
import MainLogo from '../../../assets/images/AdvanatageAutoSales_Logo.png';


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNotValid, setIsNotValid] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsNotValid(false);
      const userAuth = await auth.login(email, password)
      if (userAuth.email) {
        //check isActive
     
        const isActive = await database.chkIfUserActive(FireStoreConst.USER_DOC, userAuth.uid);
   
        if (isActive) {
          dispatch(
            login({
              email: userAuth.email,
              uid: userAuth.uid,
              displayName: userAuth.displayName,
              photoUrl: userAuth.photoURL,
            })
          );
          navigate(RoutesConst.ADMIN_ROUTE.concat('/', RoutesConst.ADMIN_INVENTORY_ROUTE));
        }
        else {
          setIsNotValid(true);
        }
      }
      else {
        setIsNotValid(true);
      }
    }
    catch (e) {
      setIsNotValid(true);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 25,
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
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  component="button"
                  underline="hover"
                  onClick={() => navigate('/reset')}
                >
                 {"Forgot Password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  component="button"
                  underline="hover"
                  onClick={() => navigate('/signup')}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            &nbsp;
            <CopyrightComponet />
          </Box>
        </Box>
        {isNotValid && <SnackbarElement isOpen={isNotValid} message={'Please enter a valid username and password..'} />}
      </Container>
    </>
  );
};
export default LoginForm;