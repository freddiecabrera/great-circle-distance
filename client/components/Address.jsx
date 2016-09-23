import React from 'react';
const { object } = React.PropTypes;

const Address = props => (
  <div className='u-full-width address-box'>
    <span className='address-box-text'>{props.item.street_number}</span>
    <span className='address-box-text'>{props.item.route},</span>
    <span className='address-box-text'>{props.item.locality},</span>
    <span className='address-box-text'>{props.item.administrativeArea}</span>
    <span className='address-box-text'>{props.item.postalCode},</span>
    <span className='address-box-text'>{props.item.country}</span>
  </div>
);

Address.propTypes = {
  item: object.isRequired
};

export default Address;
