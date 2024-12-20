'use strict';
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '469 One Horn Paradise',
        city: 'Wilton Manors',
        state: 'FL',
        country: 'United States of Fuzzyness',
        lat: 26.1604,
        lng: 80.1389,
        name: 'Xtra Pegasus Den',
        description: 'The hottest spot in South Florida. One rental at Xtra Pegasus Den and your life will be changed forever.',
        price: 699.99
      },
      {
        ownerId: 2,
        address: '1057 Washington Ave',
        city: 'Miami Beach',
        state: 'FL',
        country: 'United States of Fuzzyness',
        lat: 25.7934,
        lng: 80.1392,
        name: 'Unicorn Twist',
        description: 'The second hottest spot in South Florida. One rental at Unicorn Twist and your life will also be changed forever.',
        price: 599.99
      },
      {
        ownerId: 3,
        address: '29 NE 11th Street',
        city: 'Miami',
        state: 'FL',
        country: 'United States of Fuzzyness',
        lat: 25.7850,
        lng: 80.1936,
        name: 'E11EVEN Horns',
        description: 'The third hottest spot in South Florida. One rental at E11EVEN Horns and your life will also be changed forever just like the other two.',
        price: 399.99
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
