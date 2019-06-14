import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

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

  componentDidMount(){
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res)
        this.setState({ smurfs: res.data })
      })
      .catch(err => console.log(err))
  }

  newSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        this.setState({ smurfs: res.data})
      })
      .catch(err => console.log(err))
  }

  deleteSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${smurf.id}`)
      .then(res => {
        this.setState({ smurfs: res.data})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink className='link' activeClassName='active-link' exact to='/'>See Smurfs</NavLink>
          <NavLink className='link' activeClassName='active-link' to='/smurf-form'>Add a Smurf</NavLink>
        </nav>
        <Route exact path='/' render={props =>  <Smurfs smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} /> } />
        <Route path='/smurf-form' render={props => <SmurfForm newSmurf={this.newSmurf} /> } />
        <Route path='/smurf/:id' render={props => <Smurf {...props} smurfs={this.state.smurfs} /> } />
      </div>
    );
  }
}

export default App;
