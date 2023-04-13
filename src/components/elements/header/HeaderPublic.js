import * as React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import './Header.scss';
import { Link } from 'react-router-dom'
import Logo from '../../logo/logo';
import MainLogo from '../../../assets/images/AdvanatageAutoSales_Logo.png';
import { RoutesConst } from '../../../constants/AppConstants';

function HeaderPublic() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderPublic;