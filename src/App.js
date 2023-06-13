import React from 'react';
// import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      city: '',
      locationData: [],
      error: true
    }
  }
  render() {
    return (
      <>
        <h1>Hi</h1>
      </>
    )
  }
}


export default App;
