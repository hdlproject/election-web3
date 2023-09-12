import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ElectionContract from '../../helpers/ElectionContract';

class StartFinishClass extends React.Component {
  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  async handleStart(event) {
    console.log('start');
    await ElectionContract.start();
    event.preventDefault();
  }

  async handleFinish(event) {
    console.log('finish');
    await ElectionContract.finish();
    event.preventDefault();
  }

  render() {
    return (
      <Box>
        <Button
          type="submit" fullWidth variant="contained" color="primary"
          sx={{m: 1}} onClick={this.handleStart}
        >
          Start
        </Button>

        <Button
          type="submit" fullWidth variant="contained" color="primary"
          sx={{m: 1}} onClick={this.handleFinish}
        >
          Finish
        </Button>
      </Box>
    );
  }
}

export default function StartFinish(props) {
  return <StartFinishClass {...props}/>;
};
