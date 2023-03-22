import React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import AppBar from './AppBar';
import Menu from './Menu';
import {routes} from '../routes';
import Web3Client from '../helpers/Web3Client';

class DrawerClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      login: false,
      address: '',
      anchorElUser: null,
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false,
    });
  };

  handleLogin = () => {
    Web3Client.getAddress()
      .then(response => {
        this.setState({
          login: true,
          address: response,
        });
      })
      .catch(error => console.log(error));
  };

  handleLogout = () => {
    this.setState({
      login: false,
    });
  };

  render() {
    const {theme} = this.props;

    const drawerWidth = 240;

    const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
      ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }),
      }),
    );

    const DrawerHeader = styled('div')(({theme}) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));

    return (
      <Router>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>

          <AppBar open={this.state.open}
                  login={this.state.login}
                  address={this.state.address}
                  drawerWidth={drawerWidth}
                  handleDrawerOpen={this.handleDrawerOpen}
                  handleLogin={this.handleLogin}/>

          <MuiDrawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={this.state.open}
          >
            <DrawerHeader>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon/> :
                  <ChevronRightIcon/>}
              </IconButton>
            </DrawerHeader>
            <Divider/>

            <Menu/>
          </MuiDrawer>

          <Main open={this.state.open}>
            <DrawerHeader/>

            <Routes>
              <Route exact path="/" element={
                <Typography paragraph>
                  Welcome to Simple Ethereum App
                </Typography>
              }/>

              {routes.map((item) => (
                <Route path={item.path} key={JSON.stringify(item)}
                       element={item.page}/>
              ))}
            </Routes>
          </Main>
        </Box>
      </Router>
    );
  }
}

export default function Drawer(props) {
  const theme = useTheme();

  return <DrawerClass {...props} theme={theme}/>;
};
