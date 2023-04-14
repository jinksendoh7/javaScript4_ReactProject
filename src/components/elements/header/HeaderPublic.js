import * as React from 'react';
import { Link } from 'react-router-dom'
import './Header.scss';
import Logo from '../../logo/logo';
import MainLogo from '../../../assets/images/AdvanatageAutoSales_Logo.png';
import { AppBar, Toolbar, Container } from '@mui/material';
import { RoutesConst } from '../../../constants/AppConstants';
import LoginButton from './buttons/LoginButton';

function HeaderPublic() {

  // const [anchorElNav, setAnchorElNav] = React.useState(null);           DOUBLE CHECK IF NEEDED THIS PAGE
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };


  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar position="fixed" elevation={0} className='header-alt'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={RoutesConst.HOME_ROUTE}>
            <Logo
              url={MainLogo}
              altDisplay="mainLogo"
            />
          </Link>
          <div style={{ flex: 1 }}></div>
          <LoginButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderPublic;