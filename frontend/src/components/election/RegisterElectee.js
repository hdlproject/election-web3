import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

import ElectionContract from '../../helpers/ElectionContract';

class RegisterElecteeClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
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
    await ElectionContract.registerElectee(this.state.address);
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
        <Button
          type="submit" fullWidth variant="contained" color="primary"
          sx={{m: 1}} onClick={this.handleSubmit}
        >
          Register Electee
        </Button>
      </Box>
    );
  }
}

export default function RegisterElectee(props) {
  return <RegisterElecteeClass {...props}/>;
};
