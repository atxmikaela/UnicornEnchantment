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
        {
          "ownerId": 1,
          "address": "123 Main Street",
          "city": "Ames",
          "state": "IA",
          "country": "United States of America",
          "lat": 42.0347,
          "lng": -93.6203,
          "name": "The Iowa Corn Comet Crash Pad",
          "description": "Welcome to the heart of corn country! This unique rental is a converted corn-shaped UFO, a relic of the great 'Maize Mayhem' of 2042. After the crash, local farmers ingeniously transformed these alien vessels into comfortable dwellings. Step inside and find a blend of rustic charm and futuristic design. The original alien control panel, now a decorative centerpiece, glows softly at night, adding an otherworldly ambiance. The spacious living area features reclaimed wood from the original spaceship's hull, and the bedrooms offer panoramic views of the surrounding cornfields. Enjoy a fully equipped kitchen with modern appliances, perfect for preparing a hearty breakfast or a gourmet dinner. Outside, a large patio provides ample space for stargazing or simply relaxing and soaking in the serene atmosphere. Just a short drive away, you'll find local attractions like the Iowa State University campus, the Reiman Gardens, and numerous farm-to-table restaurants. Experience a truly unique getaway in this one-of-a-kind corn-ship!",
          "price": 180.00
        },
        {
          "ownerId": 2,
          "address": "456 Elm Street",
          "city": "Roswell",
          "state": "NM",
          "country": "United States of America",
          "lat": 33.3959,
          "lng": -104.5225,
          "name": "The Roswell Kernel Kastle",
          "description": "Step into history at this converted corn-shaped UFO, located right in the heart of Roswell, the epicenter of the 'Maize Mayhem' landings. This extraordinary rental offers a blend of alien mystique and modern comfort. The interior features original alien technology repurposed into unique lighting fixtures and decorative elements. The living area is spacious and inviting, with plush seating and a large flat-screen TV. The bedrooms are designed for ultimate relaxation, with comfortable beds and blackout curtains for a restful night's sleep. The fully equipped kitchen boasts stainless steel appliances and all the cookware you need to prepare delicious meals. Outside, a private patio offers stunning views of the New Mexico desert. Explore the nearby International UFO Museum and Research Center, or take a scenic drive through the breathtaking landscapes of the region. This is more than just a rental; it's an immersive experience into the fascinating world of alien encounters and corn-shaped spaceships.",
          "price": 220.00
        },
        {
          "ownerId": 3,
          "address": "789 Oak Avenue",
          "city": "Normal",
          "state": "IL",
          "country": "United States of America",
          "lat": 40.5097,
          "lng": -88.9918,
          "name": "The Normal Niblet Nook",
          "description": "Experience the unexpected charm of Normal, Illinois, in this uniquely converted corn-shaped UFO. This rental offers a surprising blend of rural tranquility and alien intrigue. The interior design seamlessly combines rustic elements with futuristic touches, creating a cozy and inviting atmosphere. The living area features comfortable seating and a fireplace, perfect for relaxing after a day of exploring. The bedrooms are designed for ultimate comfort, with plush bedding and ample storage space. The fully equipped kitchen boasts modern appliances and all the cookware you need to prepare delicious meals. Outside, a spacious deck offers stunning views of the surrounding countryside. Explore the nearby Illinois State University campus, or take a scenic drive through the picturesque landscapes of the region. This is more than just a rental; it's an opportunity to experience the unique blend of small-town charm and extraterrestrial wonder.",
          "price": 190.00
        },
        {
          "ownerId": 4,
          "address": "100 Pine Lane",
          "city": "Lincoln",
          "state": "NE",
          "country": "United States of America",
          "lat": 40.8037,
          "lng": -96.6806,
          "name": "The Lincoln Maize Mansion",
          "description": "Discover the grandeur of this converted corn-shaped UFO, located in the heart of Lincoln, Nebraska. This spacious rental offers a luxurious blend of alien elegance and modern comfort. The interior design features high ceilings, polished concrete floors, and original alien artwork. The living area is expansive and inviting, with plush seating and a state-of-the-art entertainment system. The bedrooms are designed for ultimate relaxation, with king-size beds and spa-like bathrooms. The fully equipped kitchen boasts gourmet appliances and a large island, perfect for entertaining. Outside, a private patio offers stunning views of the city skyline. Explore the nearby University of Nebraska-Lincoln campus, or take a stroll through the charming downtown area. This is more than just a rental; it's an opportunity to experience the unique blend of urban sophistication and extraterrestrial charm.",
          "price": 250.00
        },
        {
          "ownerId": 5,
          "address": "200 Cedar Street",
          "city": "Topeka",
          "state": "KS",
          "country": "United States of America",
          "lat": 39.0481,
          "lng": -95.6780,
          "name": "The Topeka Cob Crash Pad",
          "description": "Experience the charm of Topeka, Kansas, in this uniquely converted corn-shaped UFO. This rental offers a cozy and inviting atmosphere, perfect for a relaxing getaway. The interior design features rustic wood accents and warm, inviting colors. The living area is comfortable and inviting, with plush seating and a fireplace. The bedrooms are designed for ultimate comfort, with comfortable beds and ample storage space. The fully equipped kitchen boasts modern appliances and all the cookware you need to prepare delicious meals. Outside, a spacious deck offers stunning views of the surrounding countryside. Explore the nearby Kansas State Capitol building, or take a stroll through the charming downtown area. This is more than just a rental; it's an opportunity to experience the unique blend of small-town charm and extraterrestrial wonder. And also, this is one of the closest crash sites to the geographical center of the US.",
          "price": 170.00
        },
        {
          "ownerId": 6,
          "address": "300 Birch Avenue",
          "city": "Indianapolis",
          "state": "IN",
          "country": "United States of America",
          "lat": 39.7684,
          "lng": -86.1581,
          "name": "The Indianapolis Kernel Keep",
          "description": "Discover the vibrant city of Indianapolis from this uniquely converted corn-shaped UFO. This rental offers a stylish and modern atmosphere, perfect for a city getaway. The interior design features sleek lines, polished surfaces, and original alien artwork. The living area is spacious and inviting, with plush seating and a state-of-the-art entertainment system. The bedrooms are designed for ultimate relaxation, with comfortable beds and spa-like bathrooms. The fully equipped kitchen boasts gourmet appliances and a large island, perfect for entertaining. Outside, a private balcony offers stunning views of the city skyline. Explore the nearby Indianapolis Motor Speedway, or take a stroll through the charming downtown area. This is more than just a rental; it's an opportunity to experience the unique blend of urban excitement and extraterrestrial charm.",
          "price": 230.00
        },
        {
          "ownerId": 7,
          "address": "400 Maple Street",
          "city": "Columbus",
          "state": "OH",
          "country": "United States of America",
          "lat": 39.9612,
          "lng": -82.9988,
          "name": "The Columbus Corn Crib",
          "description": "Experience the unique blend of urban and rural in Columbus, Ohio, from this wonderfully converted corn-shaped UFO. This rental offers a comfortable and inviting atmosphere, perfect for a relaxing getaway. The interior design features rustic wood accents and warm, inviting colors. The living area is cozy and inviting, with plush seating and a fireplace. The bedrooms are designed for ultimate comfort, with comfortable beds and ample storage space. The fully equipped kitchen boasts modern appliances and all the cookware you need to prepare delicious meals. Outside, a spacious deck offers stunning views of the surrounding countryside. Explore the nearby Ohio State University campus, or take a stroll through the charming downtown area. This is more than just a rental; it's an opportunity to experience the unique blend of city life and extraterrestrial wonder.",
          "price": 200.00
        },
        {
          "ownerId": 8,
          "address": "500 Walnut Avenue",
          "city": "Nashville",
          "state": "TN",
          "country": "United States
        },
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
