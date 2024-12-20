'use strict';
const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2024-12-24',
        endDate: '2024-12-26'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2025-01-01',
        endDate: '2025-01-10'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2025-02-16',
        endDate: '2025-03-10'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
