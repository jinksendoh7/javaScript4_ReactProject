import { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import CopyrightComponet from '../../copyright/CopyrightComponent';
import {useNavigate} from 'react-router-dom';
import * as auth from '../../../auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../redux/slices/usersSlice';
import { RoutesConst } from '../../../constants/AppConstants';


const VehicleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log('in');
    try {
      const userAuth = await auth.login(email, password)
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
        navigate(RoutesConst.ADMIN_ROUTE.concat('/',RoutesConst.ADMIN_DASHBOARD_ROUTE));
      }

    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <>
       <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={2} sm={4} md={4}>
              <div> 
                <label>Trim</label>
                <input type="text"/>
              </div>
              <div> 
                <label>Model</label>
                <input type="text"/>
              </div>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <div> 
                <label>Trim</label>
                <input type="text"/>
              </div>
              <div> 
                <label>Model</label>
                <input type="text"/>
              </div>
            </Grid>
        </Grid>
    </>
  );
};

export default VehicleForm;