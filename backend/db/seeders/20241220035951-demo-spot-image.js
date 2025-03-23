'use strict';
const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: '/1_1.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: '/2_1.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '/3_1.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '/4_1.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '/5_1.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '/6_1.png',
        preview: true
      },
      {
        spotId: 6,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: '/7_1.png',
        preview: true
      },
      {
        spotId: 7,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '/1_1.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: '/2_1.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: '/3_1.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: '/4_1.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: '/5_1.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: '/1_5.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: '/6_1.png',
        preview: true
      },
      {
        spotId: 13,
        url: '/1_2.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: '/1_3.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: '/1_4.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: '/1_5.jpg',
        preview: true
      },


    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
