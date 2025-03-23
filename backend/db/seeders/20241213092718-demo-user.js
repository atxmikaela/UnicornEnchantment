'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Marmar',
        lastName: 'Sansan',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Narmar',
        lastName: 'Tansan',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Oarmar',
        lastName: 'Uansan',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "cornfan1@user.io",
        username: "KernelKing",
        firstName: "Cornelius",
        lastName: "Cobsworth",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "spacehusk2@user.io",
        username: "AstroHusk",
        firstName: "Huskley",
        lastName: "Nebula",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "butterlover3@user.io",
        username: "ButteryBaron",
        firstName: "Bartholomew",
        lastName: "Butterfield",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "alienopera4@user.io",
        username: "OperaAlien",
        firstName: "Aria",
        lastName: "Stardust",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "cobcoaster5@user.io",
        username: "RollerCob",
        firstName: "Coaster",
        lastName: "Looping",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "silktreats6@user.io",
        username: "SilkySmooth",
        firstName: "Seraphina",
        lastName: "Silkwood",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "maizezen7@user.io",
        username: "ZenMaize",
        firstName: "Mantra",
        lastName: "Cornfield",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "starchart8@user.io",
        username: "StarCobber",
        firstName: "Celestia",
        lastName: "Stargaze",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "huskfu9@user.io",
        username: "HuskMaster",
        firstName: "Fung",
        lastName: "Husk",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "cornprophet10@user.io",
        username: "CornSage",
        firstName: "Prophecy",
        lastName: "Grain",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "muffinmagic11@user.io",
        username: "MuffinMage",
        firstName: "Magica",
        lastName: "Batter",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "shadowstalker12@user.io",
        username: "ShadowCob",
        firstName: "Silhouette",
        lastName: "Darkhusk",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "telecob13@user.io",
        username: "TeleCobber",
        firstName: "Psychic",
        lastName: "Kernel",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "goldenmummy14@user.io",
        username: "GoldWraps",
        firstName: "Midas",
        lastName: "Husk",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "cornfountain15@user.io",
        username: "FountainCob",
        firstName: "Aqua",
        lastName: "Cornwell",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "cornrunner16@user.io",
        username: "SpeedCob",
        firstName: "Mercury",
        lastName: "Grain",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: "cornpeak17@user.io",
        username: "PeakKernel",
        firstName: "Summit",
        lastName: "Cobridge",
        hashedPassword: bcrypt.hashSync('password3')
      }

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
