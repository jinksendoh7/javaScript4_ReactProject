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
import TeamDetails from "./TeamDetails";

const TeamMember = () => {
  const [teamData, setTeamData] = useState([]);
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const getTeamData = async () => {
    try {
      const userInfo = await load(FireStoreConst.TEAM_DOC);
      setTeamData(userInfo);
    } catch (e) {
      console.log(e);
    }
  };
  getTeamData();

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4} style={{ marginBottom: "50px" }}>
        {teamData.map((data, index) => (
          <TeamDetails key={index} data={data} />
        ))}
      </Grid>
    </Container>
  );
};

export default TeamMember;
