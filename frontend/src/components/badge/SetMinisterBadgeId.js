import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

import BadgeContract from '../../helpers/BadgeContract';

class SetMinisterBadgeIdClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenId: '',
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
    await BadgeContract.setMinisterBadgeId(this.state.tokenId);
    event.preventDefault();
  }

  render() {
    return (
      <Box>
        <FormControl fullWidth sx={{m: 1}} variant="outlined">
          <InputLabel htmlFor="tokenId">Token Id</InputLabel>
          <OutlinedInput id="tokenId" type="text" value={this.state.tokenId}
            onChange={this.handleChange} label="Token Id"/>
        </FormControl>
        <Button
          type="submit" fullWidth variant="contained" color="primary"
          sx={{m: 1}} onClick={this.handleSubmit}
        >
          Change Minister
        </Button>
      </Box>
    );
  }
}

export default function SetMinisterBadgeId(props) {
  return <SetMinisterBadgeIdClass {...props}/>;
};
