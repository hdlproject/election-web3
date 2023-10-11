import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import {useNavigate} from 'react-router-dom';

import {routes} from '../routes';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {Map} from 'immutable';

class MenuClass extends React.Component {
  constructor(props) {
    super(props);

    let openMap = new Map();
    routes.map((item) => (
      openMap = openMap.set(item.id, false)
    ));

    this.state = {
      openMap: openMap,
    };

    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleClickParentMenu = this.handleClickParentMenu.bind(this);
  }

  handleClickMenu(path) {
    this.props.navigate(path);
  }

  handleClickParentMenu(id) {
    const openMap = this.state.openMap.update(id, (open) => !open);

    this.setState({
      openMap: openMap,
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (!this.props.open) {
      let openMap = new Map();
      routes.map((item) => (
        openMap = openMap.set(item.id, false)
      ));

      this.setState({
        openMap: openMap,
      });
    }

    return true;
  }

  render() {
    return (
      <List>
        {
          routes.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem key={'item-' + item.id} disablePadding
                        onClick={() => this.handleClickParentMenu(item.id)}>
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name}/>
                  {
                    this.state.openMap.get(item.id) ?
                      <ExpandLess/> : <ExpandMore/>
                  }
                </ListItemButton>
              </ListItem>

              <Collapse key={'collapse-' + item.id}
                        in={this.state.openMap.get(item.id) && this.props.open}
                        timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {
                    item.pages.map((subItem) => (
                      <ListItem key={subItem.id} sx={{pl: 4}} disablePadding
                                onClick={() => this.handleClickMenu(subItem.path)}>
                        <ListItemButton>
                          <ListItemIcon>
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={subItem.name}/>
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
            </React.Fragment>
          ))
        }
      </List>
    );
  }
}

MenuClass.propTypes = {
  open: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default function Menu(props) {
  const navigate = useNavigate();

  return <MenuClass {...props} navigate={navigate}/>;
};
