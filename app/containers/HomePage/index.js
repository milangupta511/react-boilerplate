/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Icon from 'material-ui/Icon';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import DeleteIcon from 'material-ui-icons/delete';
import List, {ListItem, ListItemText, ListItemSecondaryAction} from 'material-ui/List';


const style = theme =>({
  root: {
    paddingTop: 30
  },
  paper: {
    width: '100%',
    padding: 16,
    display: 'flex'
  },
  heading: {...theme.typography.button, fontSize: 30, textAlign: 'center'},
  input: {
    width: '95%'
  },
  addIcon: {
    fontSize:32,
    color:'#002884'
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    padding:16
  },
  listItem: {
    borderBottom: '1px solid #CFD8DC'
  },
  delete: {
    color: '#002884',
    marginTop : 10,
    cursor: 'pointer'
  },
  itemText: {
    cursor: 'text'
  }
})
 class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {classes} = this.props
    return (
      <div >
        <Grid container justify={'center'} className={classes.root}>
          <Grid item xs={9} className={classes.heading}>TODO APP</Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <Input
                placeholder="Add Some todo items"
                className={classes.input}
                inputProps={{
                  'aria-label': 'input-todo',
                }}
              />
              <Icon className={classes.addIcon}>add_circle</Icon>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper>
            <AppBar position="static" color="default">
                <Tabs
                  value={2}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Item One" />
                  <Tab label="Item Two" />
                  <Tab label="Item Three" />
                </Tabs>
              </AppBar>
              <List className={classes.list}>
                {[0,1,2,3].map((item,index) => (
                   <ListItem key={index}  className={classes.listItem}>
                    <Checkbox
                      tabIndex={-1}
                    />
                    <ListItemText className={classes.itemText} contentEditable primary={`Line item ${item + 1}`} />
                    <ListItemSecondaryAction>
                      <DeleteIcon className={classes.delete}/>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(style)(HomePage)