import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
//components
import UserSignUpForm from './components/userSignUpForm';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Container>
        <UserSignUpForm/>
      </Container>
      </div>
    );
  }
}

export default App;
