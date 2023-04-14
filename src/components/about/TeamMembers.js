import { useState } from "react";
import { Container, Grid } from "@mui/material";
import { load } from "../../database/read";
import { FireStoreConst } from "../../constants/AppConstants";
import TeamDetails from "./TeamDetails";

const TeamMembers = () => {
  const [teamData, setTeamData] = useState([]);
  //const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
export default TeamMembers;
