import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';

class LoginClass extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.handleLogin();
  }

  render() {
    return (
      <Grid container component="main"
            alignItems={'center'}
            justifyContent={'center'}
            sx={{height: '100vh', width: '100vw'}}>
        <CssBaseline/>

        <Grid item
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                backgroundSize: 'cover',
                backgroudPosition: 'center',
              }}
        >
          <Grid container component="main"
                alignItems={'center'}
                justifyContent={'center'}
                sx={{height: '100vh', width: '100vw'}}>
            <Grid item>
              <IconButton
                component={Paper} elevation={12}
                onClick={this.handleLogin}
                sx={{width: 'auto', height: 'auto', bgcolor: 'info.main'}}>
                <LockOutlinedIcon
                  sx={{m: 3, width: 90, height: 90}}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

LoginClass.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default function Login(props) {
  return <LoginClass {...props}/>;
};
