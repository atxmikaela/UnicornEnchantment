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
        url: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTJO_TYDsdas_w6ESbzv11SNR2YBBFV7FU1RtLJb2hZfuVbtKRlUpuKLxF8RMpBHBP2WZtY8aQ3ZiQdNbiGKEKJC864KhD7FWYpZObv6uc',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTZonKlXXY8hdeQRA2FJPlSnMqwOxgpT6xrD7_crz8BQXzHirgfrHzI-7RXCyyUJ1pea60Cv9QU2F5RWGa5O-a29JPAlYY9leJW_uw5-Q',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSPoDsjyAiWSP_EXRu-JnsrTKBzPjy26RIG5ETXcZSGBFA9Wa4RcuOvgbYcpSXrw4kXpub5en0v8J7LYHohoRPo5AARfiwaIfe-khxCOA',
        preview: false
      }
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
