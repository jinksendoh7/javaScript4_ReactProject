import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import './Header.scss';

import * as auth from '../../../auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/usersSlice';
import { RoutesConst } from '../../../constants/AppConstants';

import Logo from '../../logo/logo';
import DrawerHeader from './DrawerHeader';
import MainLogo from '../../../assets/images/AdvanatageAutoSales_Logo.png';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  CssBaseline,
  Toolbar,
  Button,
}from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Box from '@mui/material/Box';

import DrawerHeader from './DrawerHeader';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Logo from '../../logo/logo';
import MainLogo from '../../../assets/images/AdvanatageAutoSales_Logo.png';

import './Header.scss';
import { RoutesConst } from '../../../constants/AppConstants';
import { useDispatch} from 'react-redux';
import * as auth from '../../../auth';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../../redux/slices/usersSlice';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import {useState} from 'react'
import SnackbarElement from '../snack-bar/SnackbarElement';


const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    auth.logout();
    dispatch(logout());
    navigate(RoutesConst.HOME_ROUTE);
  }

  const MenuIcons = [<GroupsOutlinedIcon />, <DirectionsCarFilledOutlinedIcon />, <PeopleOutlinedIcon />]
  const OtherIcons = [<AccountCircleOutlinedIcon />, <ExitToAppOutlinedIcon />];

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="header" elevation={0} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Logo
              url={MainLogo}
              altDisplay="mainLogo"
            />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={onLogout} disableElevation>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ mt: 5 }}>
          {['Customers', 'Vehicles', 'Users'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <NavLink className={({ isActive }) => (isActive ? 'menu-active' : '')} to={'/admin/' + text.replace(" ", "-").toLowerCase()}>{MenuIcons[index]}</NavLink>
                </ListItemIcon>
                <ListItemText primary={
                  <NavLink className={({ isActive }) => (isActive ? 'menu-active' : '')} to={'/admin/' + text.replace(" ", "-").toLowerCase()}>{text}</NavLink>
                } sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['My Account', 'Signout'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <NavLink className={({ isActive }) => (isActive ? 'menu-active' : '')} to={'/admin/' + text.replace(" ", "-").toLowerCase()}>{OtherIcons[index]}</NavLink>
                </ListItemIcon>
                <ListItemText primary={

                    text ==='Sign Out' ?
                   <NavLink  className={({ isActive }) => (isActive ? 'menu-active' : '')} to={'/admin/'+ text.replace(" ","-").toLowerCase()}>{text}</NavLink>
                  :
                  <NavLink  className={({ isActive }) => (isActive ? 'menu-active' : '')} onClick={()=>onLogout()}>{text}</NavLink>

                } sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {isLogout && <SnackbarElement isOpen={isLogout} message={'You have succesffuly logout.'}/>}
    
      </>

  );
}
