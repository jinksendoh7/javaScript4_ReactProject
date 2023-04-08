import { Box, Container, Grid, Typography } from "@mui/material";
import CopyrightComponet from "../copyright/CopyrightComponent";
import "./Footer.scss";
import { FaMapMarker } from "react-icons/fa";
import  { AppTextConst }  from "../../constants/AppConstants"

const Footer = () => {
  return (
    <Box className="footerBox" component="footer">
      <Container>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <Typography className="appName">{AppTextConst.companyName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">
              <CopyrightComponet />
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography className="footerCall">
              <FaMapMarker />
              {`123 Fanshawe Downtown London, ON`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
