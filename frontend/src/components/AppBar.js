import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

class AppBarClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorElUser: null,
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
  }

  handleDrawerOpen = () => {
    this.props.handleDrawerOpen();
  };

  handleClick() {
    this.props.navigate('/');
  }

  handleLogin() {
    this.props.handleLogin();
  }

  handleOpenUserMenu = (event) => {
    this.setState({
      anchorElUser: event.currentTarget,
    });
  };

  handleCloseUserMenu = () => {
    this.setState({
      anchorElUser: null,
    });
  };

  render() {
    const StyledMuiAppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => {
        return prop !== 'open';
      },
    })(({theme, open, anchorEl}) => {
      return ({
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${this.props.drawerWidth}px)`,
          marginLeft: `${this.props.drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      });
    });

    const settings = [this.props.address];

    return (
      <StyledMuiAppBar position="fixed" open={this.props.open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            size="large"
            sx={{mr: 2, ...(this.props.open && {display: 'none'})}}
          >
            <MenuIcon/>
          </IconButton>

          <Typography variant="h6" component="div" sx={{flexGrow: 1}}
            onClick={this.handleClick}>
            Simple Ethereum App
          </Typography>

          {this.props.login ?
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={this.handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                </IconButton>
              </Tooltip>

              <Popover
                sx={{mt: '45px'}}
                anchorEl={this.state.anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(this.state.anchorElUser)}
                onClose={this.handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Popover>
            </Box> :
            <Button onClick={this.handleLogin} color="inherit">Login</Button>
          }
        </Toolbar>
      </StyledMuiAppBar>
    );
  }
}

export default function AppBar(props) {
  const navigate = useNavigate();

  return <AppBarClass {...props} navigate={navigate}/>;
};
