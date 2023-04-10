import { useState } from "react";
import { Grid, TextField, Box } from "@mui/material";

import CopyrightComponet from "../../copyright/CopyrightComponent";
import { useNavigate } from "react-router-dom";
import * as auth from "../../../auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../redux/slices/usersSlice";
import { RoutesConst } from "../../../constants/AppConstants";

const VehicleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("in");
    try {
      const userAuth = await auth.login(email, password);
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
        navigate(
          RoutesConst.ADMIN_ROUTE.concat("/", RoutesConst.ADMIN_DASHBOARD_ROUTE)
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 12, md: 8 }}
      >
        <Grid
          item
           xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="Brand:" variant="outlined" />
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="Model:" variant="outlined" />
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="Year:" variant="outlined" />
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="VIN:" variant="outlined" />
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="Exterior:" variant="outlined" />
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="Type:" variant="outlined" />
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="Fuel Type:" variant="outlined" />
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="Transmission:" variant="outlined" />
        </Grid>
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
        >
          <TextField label="Mileage:" variant="outlined" />
        </Grid>
      </Grid>
    </>
  );
};

export default VehicleForm;
