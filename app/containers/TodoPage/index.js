/*
 * TodoPage
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
import { withStyles } from 'material-ui/styles';
import {compose, bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Icon from 'material-ui/Icon';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import DeleteIcon from 'material-ui-icons/Delete';
import AddCircle from 'material-ui-icons/AddCircle';
import List, {ListItem, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import SwipeableViews from 'react-swipeable-views';

import reducer from './reducer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectInputValue, makeSelectTodoList, makeSelectTabValue } from './selectors';
import { changeInput, addTodo, toggleCompleteTodo, deleteTodo, changeTab} from './actions';
import injectReducer from 'utils/injectReducer'


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
  },
  form: {
    width: '100%'
  }
})
 class TodoPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {classes} = this.props
    return (
      <div >
        <Grid container justify={'center'} className={classes.root}>
          <Grid item xs={9} className={classes.heading}>TODO APP</Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={this.onFormSubmit}>
              <Input
                placeholder="Add Some todo items"
                className={classes.input}
                inputProps={{
                  'aria-label': 'input-todo',
                }}
                value={this.props.inputValue}
                onChange={this.handleInputChange}
              />
              <button type="submit"><AddCircle className={classes.addIcon} /></button>
              </form>
            </Paper>
          </Grid>
          {this.props.todoList.length>0 && <Grid item xs={9}>
            <Paper>
            <AppBar position="static" color="default">
                <Tabs
                  value={this.props.tabValue}
                  onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="all" />
                  <Tab label="unfinished" />
                  <Tab label="completed" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={'x'}
                index={this.props.tabValue}
                onChangeIndex={this.handleTabChange}
              >
                <div >Item One</div>
                <div >Item Two</div>
                <div >Item Three</div>
              </SwipeableViews>
              <List className={classes.list}>
                {this.props.todoList.map(({id, term, isCompleted}, index) => (
                   <ListItem key={id}  className={classes.listItem}>
                    <Checkbox
                      tabIndex={-1}
                      checked={isCompleted}
                      onChange = {this.handleCompletionChange.bind(this, id)}
                    />
                    <ListItemText className={classes.itemText} contentEditable primary={term} />
                    <ListItemSecondaryAction>
                      <DeleteIcon className={classes.delete} onClick={this.handleDeleteClick.bind(this, id)}/>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>}
        </Grid>
      </div>
    );
  }
  onFormSubmit = (event) => {
    event.preventDefault()
    if(this.props.inputValue) {
      this.props.addTodo(this.props.inputValue);
      this.props.changeInput('')
    }
  }
  handleInputChange = (event) => {
    this.props.changeInput(event.target.value)
  }
  handleCompletionChange = (id) => {
    this.props.toggleCompleteTodo(id)
  }
  handleDeleteClick = (id) => {
    this.props.deleteTodo(id)
  }
  handleTabChange = (event, index) =>{
    this.props.changeTab(index)
  }
}

const mapStateToProps = createStructuredSelector({
  inputValue: makeSelectInputValue(),
  todoList: makeSelectTodoList(),
  tabValue: makeSelectTabValue()
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addTodo, changeInput, toggleCompleteTodo, deleteTodo, changeTab}, dispatch)
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withMaterialStyles = withStyles(style)
const withReducer = injectReducer({ key: 'todoPage', reducer });

export default compose(
  withReducer,
  withConnect,
  withMaterialStyles
)(TodoPage)