import React from 'react';
import './App.css';
import HomeScreen from './screens/home'
import LoginScreen from './screens/login'
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <Router>
        <div className="App">
            <Route path="/" exact component={HomeScreen} />
            <Route path="/todo/:todoId" exact component={HomeScreen} />
            <Route path="/login" exact component={LoginScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
