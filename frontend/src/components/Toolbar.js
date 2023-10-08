import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';

class ToolbarClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorElUser: null,
    };

    this.handleClickTitle = this.handleClickTitle.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
  }

  handleClickTitle() {
    this.props.navigate('/');
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
    const settings = [this.props.address];

    return (
      <Box sx={{display: 'flex', flexGrow: 1}}>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}
                    onClick={this.handleClickTitle}>
          E-Government
        </Typography>

        <Box sx={{flexGrow: 0}}>
          <Tooltip title="Open settings">
            <IconButton onClick={this.handleOpenUserMenu} sx={{p: 0}}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
            </IconButton>
          </Tooltip>

          <Popover
            sx={{mt: '5px'}}
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
            {
              settings.map((setting) => (
                <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))
            }
          </Popover>
        </Box>
      </Box>
    );
  }
}

export default function Toolbar(props) {
  const navigate = useNavigate();

  return <ToolbarClass {...props} navigate={navigate}/>;
};
