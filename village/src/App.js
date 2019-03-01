import React, { Component } from 'react';
import axios from "axios";
import {
  BrowserRouter as Router,
  NavLink, Link,
  Route
  
} from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    console.log("CDM now running");
    // http://localhost:3333 is the address to the server doorstep
    // /items is the "endpoint"
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        console.log("got the following from server", res.data);
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log("in catch error", err);
        this.setState({ error: err });
      });
  }

  deleteItem = (e, id) => {
    e.preventDefault();
    console.log('now in deleteItem in App');
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        console.log('Data is back, now set state and reroute', res.data);
        this.setState({
          smurfs: res.data
        });
        // this.props.history.push('/item-list');
      })
      .catch(err => {
        console.log(err);
      });
  };

  addItem = (e, item) => {
    e.preventDefault();
    console.log(`in addItem method`);

    axios
      .post('http://localhost:3333/smurfs', item)
      .then(res => {
        this.setState({
          smurfs: res.data
        }   
        );
        // HTTP STEP V - Clear data form in ItemForm and route to /item-list
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }; //end addItem()

  // render={
  //   props => <ItemList {...props} items={this.state.items
  render() {
    return (
      
      <div className="App">
        <div className = "nav">
        <NavLink to = '/'>Home</NavLink>
        <NavLink to = '/smurf-form'>Add Smurf</NavLink>
        </div>
        <Route exact path="/smurf-form" render = { props => <SmurfForm {...props} addItem = {this.addItem} /> } />
        {/* <SmurfForm addItem = {this.addItem}/> */}
        <Route exact path="/" render = { props => <Smurfs {...props} smurfs = {this.state.smurfs} deleteItem = {this.deleteItem} /> } />
        {/* <Smurfs smurfs={this.state.smurfs} /> */}
      </div>
    );
  }
}

export default App;
