'use strict';
const { ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: '/r1.jpeg'
      },
      {
        reviewId: 1,
        url: '/r2.jpeg'
      },
      {
        reviewId: 1,
        url: '/r3.jpeg'
      },
      {
        reviewId: 1,
        url: '/r4.jpeg'
      },
      {
        reviewId: 1,
        url: '/r5.jpeg'
      },
      {
        reviewId: 2,
        url: '/r1.jpeg'
      },
      {
        reviewId: 2,
        url: '/r2.jpeg'
      },
      {
        reviewId: 2,
        url: '/r3.jpeg'
      },
      {
        reviewId: 2,
        url: '/r4.jpeg'
      },
      {
        reviewId: 2,
        url: '/r5.jpeg'
      },
      {
        reviewId: 3,
        url: '/r1.jpeg'
      },
      {
        reviewId: 3,
        url: '/r2.jpeg'
      },
      {
        reviewId: 3,
        url: '/r3.jpeg'
      },
      {
        reviewId: 3,
        url: '/r4.jpeg'
      },
      {
        reviewId: 3,
        url: '/r5.jpeg'
      },
      {
        reviewId: 4,
        url: '/r1.jpeg'
      },
      {
        reviewId: 4,
        url: '/r2.jpeg'
      },
      {
        reviewId: 4,
        url: '/r3.jpeg'
      },
      {
        reviewId: 4,
        url: '/r4.jpeg'
      },
      {
        reviewId: 4,
        url: '/r5.jpeg'
      },
      {
        reviewId: 5,
        url: '/r1.jpeg'
      },
      {
        reviewId: 5,
        url: '/r2.jpeg'
      },
      {
        reviewId: 5,
        url: '/r3.jpeg'
      },
      {
        reviewId: 5,
        url: '/r4.jpeg'
      },
      {
        reviewId: 5,
        url: '/r5.jpeg'
      },
      {
        reviewId: 6,
        url: '/r1.jpeg'
      },
      {
        reviewId: 6,
        url: '/r2.jpeg'
      },
      {
        reviewId: 6,
        url: '/r3.jpeg'
      },
      {
        reviewId: 6,
        url: '/r4.jpeg'
      },
      {
        reviewId: 6,
        url: '/r5.jpeg'
      },
      {
        reviewId: 7,
        url: '/r1.jpeg'
      },
      {
        reviewId: 7,
        url: '/r2.jpeg'
      },
      {
        reviewId: 7,
        url: '/r3.jpeg'
      },
      {
        reviewId: 7,
        url: '/r4.jpeg'
      },
      {
        reviewId: 7,
        url: '/r5.jpeg'
      },
      {
        reviewId: 8,
        url: '/r1.jpeg'
      },
      {
        reviewId: 8,
        url: '/r2.jpeg'
      },
      {
        reviewId: 8,
        url: '/r3.jpeg'
      },
      {
        reviewId: 8,
        url: '/r4.jpeg'
      },
      {
        reviewId: 8,
        url: '/r5.jpeg'
      },
      {
        reviewId: 9,
        url: '/r1.jpeg'
      },
      {
        reviewId: 9,
        url: '/r2.jpeg'
      },
      {
        reviewId: 9,
        url: '/r3.jpeg'
      },
      {
        reviewId: 9,
        url: '/r4.jpeg'
      },
      {
        reviewId: 9,
        url: '/r5.jpeg'
      },
      {
        reviewId: 10,
        url: '/r1.jpeg'
      },
      {
        reviewId: 10,
        url: '/r2.jpeg'
      },
      {
        reviewId: 10,
        url: '/r3.jpeg'
      },
      {
        reviewId: 10,
        url: '/r4.jpeg'
      },
      {
        reviewId: 10,
        url: '/r5.jpeg'
      },
      {
        reviewId: 11,
        url: '/r1.jpeg'
      },
      {
        reviewId: 11,
        url: '/r2.jpeg'
      },
      {
        reviewId: 11,
        url: '/r3.jpeg'
      },
      {
        reviewId: 11,
        url: '/r4.jpeg'
      },
      {
        reviewId: 11,
        url: '/r5.jpeg'
      },
      {
        reviewId: 12,
        url: '/r1.jpeg'
      },
      {
        reviewId: 12,
        url: '/r2.jpeg'
      },
      {
        reviewId: 12,
        url: '/r3.jpeg'
      },
      {
        reviewId: 12,
        url: '/r4.jpeg'
      },
      {
        reviewId: 12,
        url: '/r5.jpeg'
      },
      {
        reviewId: 13,
        url: '/r1.jpeg'
      },
      {
        reviewId: 13,
        url: '/r2.jpeg'
      },
      {
        reviewId: 13,
        url: '/r3.jpeg'
      },
      {
        reviewId: 13,
        url: '/r4.jpeg'
      },
      {
        reviewId: 13,
        url: '/r5.jpeg'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
