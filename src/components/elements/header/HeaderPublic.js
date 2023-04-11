import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import './Header.scss';
import {Link} from 'react-router-dom'
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
    <AppBar position="static" elevation={0} className='header-alt'>
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