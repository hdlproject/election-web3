import React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Toolbar from './Toolbar';
import Menu from './Menu';
import {routes} from '../routes';
import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

class DrawerClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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

  render() {
    const theme = this.props.theme;

    const drawerWidth = 240;

    const StyledMuiAppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(
      ({theme, open, anchorEl}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }),
    );

    const DrawerHeader = styled('div')(
      ({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      }),
    );

    const Main = styled('main', {
      shouldForwardProp: (prop) => prop !== 'open',
    })(
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

    return (
      <Router>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>

          <StyledMuiAppBar position="fixed"
                           open={this.state.open}
                           address={this.state.address}
          >
            <MuiToolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                size="large"
                sx={{mr: 2, ...(this.state.open && {display: 'none'})}}
              >
                <MenuIcon/>
              </IconButton>

              <Toolbar
                address={this.props.address}
                handleLogout={this.props.handleLogout}
              />
            </MuiToolbar>
          </StyledMuiAppBar>

          <MuiDrawer
            sx={{
              'width': drawerWidth,
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

            <Menu open={this.state.open}/>
          </MuiDrawer>

          <Main open={this.state.open}>
            <DrawerHeader/>

            <Routes>
              <Route exact path="/" element={
                <Typography paragraph> Welcome to E-Government </Typography>
              }/>

              {
                routes.map((item) => (
                  item.pages.map((subItem) => (
                    <Route path={subItem.path}
                           key={JSON.stringify(subItem)}
                           element={subItem.page}
                    />
                  ))
                ))
              }
            </Routes>
          </Main>
        </Box>
      </Router>
    );
  }
}

DrawerClass.propTypes = {
  address: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default function Drawer(props) {
  const theme = useTheme();

  return <DrawerClass {...props} theme={theme}/>;
};
