import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

import MoneyContract from '../../helpers/MoneyContract';

class TransferClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      amount: 0,
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
    await MoneyContract.transfer(this.state.address, this.state.amount)
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
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <OutlinedInput id="amount" type="number" value={this.state.amount}
                         onChange={this.handleChange} label="Amount"/>
        </FormControl>
        <Button
          type="submit" fullWidth variant="contained" color="primary"
          sx={{m: 1}} onClick={this.handleSubmit}
        >
          Transfer
        </Button>
      </Box>
    );
  }
}

export default function Transfer(props) {
  return <TransferClass {...props}/>;
};
