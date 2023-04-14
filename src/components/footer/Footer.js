import { Box, Grid } from "@mui/material";
import CopyrightComponent from "../copyright/CopyrightComponent";
import "./Footer.scss";

const Footer = () => {
  return (
    <Box className="footerBox" component="footer">
      <Grid className="footerContainer">
        <Grid item sm>
          <CopyrightComponent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
