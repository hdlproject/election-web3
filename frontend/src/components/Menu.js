import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import {useNavigate} from 'react-router-dom';

import {routes} from '../routes';

class MenuClass extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(path) {
    this.props.navigate(path);
  }

  render() {
    return (
      <List>
        {routes.map((item) => (
          <ListItem key={item.id} disablePadding
            onClick={() => this.handleClick(item.path)}>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default function Menu(props) {
  const navigate = useNavigate();

  return <MenuClass {...props} navigate={navigate}/>;
};
