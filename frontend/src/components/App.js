import './App.css';
import Drawer from './Drawer';
import Login from './Login';
import React from 'react';
import {useTheme} from '@mui/material/styles';
import Web3Client from '../helpers/Web3Client';

class AppClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      address: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    Web3Client.getAddress()
      .then((response) => {
        this.setState({
          login: true,
          address: response,
        });
      })
      .catch((error) => console.log(error));
  }

  handleLogout = () => {
    this.setState({
      login: false,
      address: '',
    });
  };

  render() {
    let page;
    if (this.state.login) {
      page = <Drawer
        handleLogout={this.handleLogout}
        address={this.state.address}
      />;
    } else {
      page = <Login
        handleLogin={this.handleLogin}
      />;
    }

    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default function App(props) {
  return <AppClass {...props}/>;
};
