import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

class AppBarClass extends React.Component {
  constructor(props) {
    super(props);

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDrawerOpen = () => {
    this.props.handleDrawerOpen();
  };

  handleClick() {
    this.props.navigate('/');
  }

  render() {
    const StyledMuiAppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(({theme, open}) => ({
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
    }));

    return (
      <StyledMuiAppBar position="fixed" open={this.props.open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            sx={{mr: 2, ...(this.props.open && {display: 'none'})}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div"
                      onClick={this.handleClick}>
            Simple Ethereum App
          </Typography>
        </Toolbar>
      </StyledMuiAppBar>
    );
  }
}

export default function AppBar(props) {
  const navigate = useNavigate();

  return <AppBarClass {...props} navigate={navigate}/>;
};
