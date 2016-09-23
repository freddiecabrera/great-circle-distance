import React from 'react';
const { func, string } = React.PropTypes;

const LatLonInput = props => (
  <div className='ten columns'>
    <input
    onChange={props.handleChange.bind(null, 'longitude')}
    value={props.lonVal}
    className='four columns'
    type='number'
    placeholder='Longitude'
    />
    <input
    onChange={props.handleChange.bind(null, 'latitude')}
    value={props.latVal}
    className='four columns'
    type='number'
    placeholder='Latitude'
    />
    <input
    onChange={props.handleChange.bind(null, 'maxDistance')}
    value={props.maxDistVal}
    className='two columns'
    type='number'
    placeholder='Max Distance'
    />
    <button type='submit' className='two columns'>Submit</button>
  </div>
);

LatLonInput.propTypes = {
  handleChange: func.isRequired,
  lonVal: string.isRequired,
  latVal: string.isRequired,
  maxDistVal: string.isRequired
}

export default LatLonInput;
