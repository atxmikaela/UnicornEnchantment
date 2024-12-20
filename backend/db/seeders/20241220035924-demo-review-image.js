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
        url: 'https://ghk.h-cdn.co/assets/16/13/3200x2400/sd-aspect-1459268194-gettyimages-176570508.jpg'
      },
      {
        reviewId: 2,
        url: 'https://cdn.shopify.com/s/files/1/0757/8393/0173/files/dreamlike-unicorn-walking_480x480.jpg?v=1695293096'
      },
      {
        reviewId: 3,
        url: 'https://www.snexplores.org/wp-content/uploads/2020/03/1030_onwardunicorns-1-1028x579.png'
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
