import React, { Component } from 'react';
import Address from './Address.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      searchValue: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.searchValue);
    this.setState({searchValue: ''});
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ searchValue: event.target.value });

  }

  render() {
    return (
      <div className='container'>
        <h4 className='title'>Great Circle Distance</h4>
        <div className='row'>
          <div className='twelve columns'>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input
              className='u-full-width'
              type='text'
              placeholder='search address'
              value={this.state.searchValue}
              onChange={this.handleChange.bind(this)}
              />
            </form>
            <div className='flex-container'>
            </div>
          </div>
          <h5 className='title'>Addresses</h5>
          <Address />
          <Address />
          <Address />
          <Address />
        </div>
      </div>
    );
  }
};

export default App;
