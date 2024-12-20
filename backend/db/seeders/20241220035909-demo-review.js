'use strict';
const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 3,
        review: 'This place was the greatest experience ever',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'This place was the greatest experience ever except everyone was dressed exactly the same',
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: 'This place was the greatest experience ever except better',
        stars: 2
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['1', '3', '2'] }
    }, {});
  }
};
