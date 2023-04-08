import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { load } from "../../database/read";
import { FireStoreConst } from "../../constants/AppConstants";
import { useState } from "react";

function TeamDetails(props) {
  return (
    <Grid item key={props.data.id} xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image="https://images.unsplash.com/photo-1679076681908-f67832c02771?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
          alt="profile pic"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
          <Typography>{props.data.pdetails}</Typography>
        </CardContent>
        <CardActions>
          <Button size="large" target="_blank" href={props.data.linkedIn}>
            <FaLinkedin />
          </Button>
          <Button size="medium">
            <FaEnvelope />
          </Button>
          <Button
            variant="contained"
            size="large"
            target="_top"
            rel="noopener noreferrer"
            href={`mailto:${props.data.email}`}
          >
            <FaEnvelope />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TeamDetails;
