import React, { Component, PropTypes } from 'react';
import { HTTP } from 'meteor/http';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Address from '../components/Address';
import Addresses from '../../imports/api/addresses.js';
import AddressInput from '../components/AddressInput.js';
import LatLonInput from '../components/LatLonInput';
const { arrayOf, func, bool, array } = React.PropTypes;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      longitude: '',
      latitude: '',
      maxDistance: ''
    };
  }

  locations(data, maxDistance) {
    const { addresses } = this.props;
    const filteredLocations = [];
    const lon1 = data[0].geometry.location.lng;
    const lat1 = data[0].geometry.location.lat;

    for (let key in addresses[0]) {
      if (typeof addresses[0][key] === 'object') {
        const lon2 = addresses[0][key].longitude;
        const lat2 = addresses[0][key].latitude;

        const distance = this.geographicalDistance(lon1, lat1, lon2, lat2);
        const parsedMaxDistance = JSON.parse(maxDistance);
        parsedMaxDistance >= distance ? filteredLocations.push(addresses[0][key]) : null;
      }
    }
    return filteredLocations;
  }

  getLonLat(address, maxDistance) {
    const endpoint = `http://maps.googleapis.com/maps/api/geocode/json?address=${address}&sensor=false`;
    HTTP.get(endpoint, {}, (err, res) => {
      if (err) return console.error(err);
      const data = res.data.results;
      this.props.filterAddresses(this.locations(data, maxDistance));
    });
  }

  addressInput(address, maxDistance) {
    const encodedAddress = encodeURIComponent(address);
    this.getLonLat(encodedAddress, maxDistance);
  }

  lonLatInput(lon, lat, maxDistance) {
    const { addresses } = this.props;
    const filteredLocations = [];
    const lon1 = JSON.parse(lon);
    const lat1 = JSON.parse(lat);

    for(let key in addresses[0]) {
      if (typeof addresses[0][key] === 'object') {
        const lon2 = addresses[0][key].longitude;
        const lat2 = addresses[0][key].latitude;

        const distance = this.geographicalDistance(lon1, lat1, lon2, lat2);
        const parsedMaxDistance = JSON.parse(maxDistance);
        parsedMaxDistance >= distance ? filteredLocations.push(addresses[0][key]) : null;
      }
    }
    this.props.filterAddresses(filteredLocations);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { address, longitude, latitude, maxDistance} = this.state;
    this.props.inputBar ? this.addressInput(address, maxDistance) : this.lonLatInput(longitude, latitude, maxDistance);
    this.setState({
      address: '',
      longitude: '',
      latitude: '',
      maxDistance: ''
    });
  }

  handleChange(name, event) {
    var change = {};
    change[name] = event.target.value;
    name === 'address' ? this.setState({ address: change[name] }) : null;
    name === 'longitude' ? this.setState({ longitude: change[name] }) : null;
    name === 'latitude' ? this.setState({ latitude: change[name] }) : null;
    name === 'maxDistance' ? this.setState({ maxDistance: change[name] }) : null;
  }

  geographicalDistance(lon1,lat1,lon2,lat2) {
  		var ct = Math.PI/180.0;
  		lon1 *= ct;
  		lat1 *= ct;
  		lon2 *= ct;
  		lat2 *= ct;

  		var R = 3959.0;
  		var d = Math.acos(Math.sin(lat1)*Math.sin(lat2) +
  				          Math.cos(lat1)*Math.cos(lat2) *
  				          Math.cos(lon2-lon1)) * R;
  		return(d);
  	}

  render() {
    const filteredAddresses = this.props.filteredAddresses !== undefined ? this.props.filteredAddresses : [];
    return (
      <div className='container'>
        <h4 className='title'>Great Circle Distance</h4>
        <div className='row'>
          <div className='twelve columns form-container'>
            <form onSubmit={this.handleSubmit.bind(this)}>
              {this.props.inputBar
              ? <AddressInput
                searchVal={this.state.address}
                handleChange={this.handleChange.bind(this)}
                maxDistVal={this.state.maxDistance}
                />
              : <LatLonInput
                  lonVal={this.state.longitude}
                  latVal={this.state.latitude}
                  maxDistVal={this.state.maxDistance}
                  handleChange={this.handleChange.bind(this)}
               />}
              <div className='radio-container twelve columns'>
                <span>Address</span>
                <input readOnly
                  onChange={this.props.togggleCheck.bind(null, !this.props.checks[0], !this.props.checks[1])}
                  checked={this.props.checks[0]}
                  style={{marginRight: '2%'}} type='radio'
                />
                <span>Lon, Lat</span>
                <input readOnly
                  onChange={this.props.togggleCheck.bind(null, !this.props.checks[0], !this.props.checks[1])}
                  checked={this.props.checks[1]}
                  type='radio'
                />
              </div>
            </form>
          </div>
          <h5 className='title'>Addresses</h5>
          {filteredAddresses.map((item, index) => <Address key={index} item={item} />)}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  inputBar: state.UIReducer.inputBar,
  checks: state.UIReducer.checks,
  addresses: state.AddressesReducer.addresses,
  filteredAddresses: state.AddressesReducer.filteredAddresses
});

App.propTypes = {
  addresses: arrayOf(React.PropTypes.object),
  filterAddresses: func.isRequired,
  inputBar: bool.isRequired,
  filteredAddresses: arrayOf(React.PropTypes.object),
  togggleCheck: func.isRequired,
  checks: array.isRequired
}

export default connect(mapStateToProps, actions)(App);
