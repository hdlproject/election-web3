import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

import CitizenshipContract from '../../helpers/CitizenshipContract';

class RegisterCitizenClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      id: '',
      age: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  async handleSubmit(event) {
    console.log(this.state);
    await CitizenshipContract.registerCitizen(this.state.address, this.state.id, this.state.age);
    event.preventDefault();
  }

  render() {
    return (
      <Box>
        <FormControl fullWidth sx={{m: 1}} variant="outlined">
          <InputLabel htmlFor="address">Address</InputLabel>
          <OutlinedInput id="address" type="text" value={this.state.address}
            onChange={this.handleChange} label="Address"/>
        </FormControl>
        <FormControl fullWidth sx={{m: 1}} variant="outlined">
          <InputLabel htmlFor="id">ID</InputLabel>
          <OutlinedInput id="id" type="text" value={this.state.id}
            onChange={this.handleChange} label="ID"/>
        </FormControl>
        <FormControl fullWidth sx={{m: 1}} variant="outlined">
          <InputLabel htmlFor="age">Age</InputLabel>
          <OutlinedInput id="age" type="number" value={this.state.age}
            onChange={this.handleChange} label="Age"/>
        </FormControl>
        <Button
          type="submit" fullWidth variant="contained" color="primary"
          sx={{m: 1}} onClick={this.handleSubmit}
        >
          Register Citizen
        </Button>
      </Box>
    );
  }
}

export default function RegisterCitizen(props) {
  return <RegisterCitizenClass {...props}/>;
};
