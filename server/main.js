import { Meteor } from 'meteor/meteor';
import Addresses from '../imports/api/addresses.js'

Meteor.startup(() => {
  var addresses = JSON.parse(Assets.getText('addresses/addresses.json'));
  var db = Addresses.find().fetch();
  db[0] ? null : Addresses.insert(addresses);
});
