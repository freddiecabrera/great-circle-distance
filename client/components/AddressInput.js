import React from 'react';
const { func, string } = React.PropTypes;

const AddressInput = props => (
  <div>
    <input
    className='seven columns'
    type='text'
    placeholder='Address'
    value={props.searchVal}
    onChange={props.handleChange.bind(null, 'address')}
    />
    <input
    onChange={props.handleChange.bind(null, 'maxDistance')}
    value={props.maxDistVal}
    className='two columns'
    type='number'
    placeholder='Max Distance'
    />
    <button type='submit' className='two columns submit-btn'>Submit</button>
  </div>
);

AddressInput.propTypes = {
  searchVal: string.isRequired,
  handleChange: func.isRequired,
  maxDistVal: string.isRequired
}

export default AddressInput;
