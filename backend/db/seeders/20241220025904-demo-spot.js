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
                        address: "123 Kernel Kove Rd, Roachdale, IN 46172",
                        city: "Roachdale",
                        state: "IN",
                        country: "United States of America",
                        lat: 39.8667,
                        lng: -86.8778,
                        name: "The Buttered Beacon",
                        description: "Welcome to the Buttered Beacon, a genuine crashed Corn-Ship from the planet Maize-7. Our guests report hearing faint popping noises at night, believed to be residual energy from the ship's hyper-pop drive. The aliens, known as the 'Kernels,' were obsessed with butter, leaving behind vats of it in the cargo hold (now the guest bathroom). Legend says if you whisper sweet nothings to the control panel, it'll dispense warm, melted butter. Don't believe us? Try it! Unicorn Landing, where the corniest dreams come true.",
                        price: 120.00
                      },
                      {
                        ownerId: 2,
                        address: "17 Silo Sight Ln, Guide Rock, NE 68942",
                        city: "Guide Rock",
                        state: "NE",
                        country: "United States of America",
                        lat: 40.1281,
                        lng: -98.5133,
                        name: "The Shucked Sanctuary",
                        description: "The Shucked Sanctuary is a crashed Corn-Ship where the Kernels practiced their bizarre 'Husk-Fu' martial art. You'll find training dummies made of dried corn husks in the backyard. Guests have reported seeing spectral husks floating through the ship, believed to be the ghosts of Kernels practicing their forms. The main bedroom was their meditation chamber, and if you meditate long enough, you might receive visions of the Great Corn God. Unicorn Landing invites you to experience truly alien relaxation.",
                        price: 110.00
                      },
                      {
                        ownerId: 3,
                        address: "99 Cob Crash Ct, Lebanon, KS 66952",
                        city: "Lebanon",
                        state: "KS",
                        country: "United States of America",
                        lat: 39.8164,
                        lng: -98.5583,
                        name: "The Golden Grain Glitch",
                        description: "The Golden Grain Glitch is a Corn-Ship that crashed due to a malfunction in its 'Corn-GPS' system. The Kernels were attempting to deliver a giant ear of corn to their intergalactic corn festival. You'll find a giant, half-eaten corn cob in the living room, a testament to their failed mission. The ship's navigation system still tries to reroute you to Maize-7; don't be alarmed if the walls start displaying holographic cornfields. At Unicorn Landing, we embrace the glitches.",
                        price: 130.00
                      },
                      {
                        ownerId: 4,
                        address: "23 Kernel Knoll Rd, Bowlus, MN 56314",
                        city: "Bowlus",
                        state: "MN",
                        country: "United States of America",
                        lat: 45.7483,
                        lng: -94.3808,
                        name: "The Sugary Stardust Suite",
                        description: "The Sugary Stardust Suite was a Corn-Ship used for interstellar corn-baking competitions. The Kernels were obsessed with creating the perfect sweet corn muffin. The kitchen is still filled with alien baking tools and strange corn-based spices. Guests often find mysterious muffin recipes written in Kernel glyphs. The ship's gravity generator sometimes malfunctions, causing muffins to float. At Unicorn Landing, we believe in the magic of corn-flavored space-baking.",
                        price: 140.00
                      },
                      {
                        ownerId: 5,
                        address: "56 Pop Top Pl, Tolstoy, SD 57475",
                        city: "Tolstoy",
                        state: "SD",
                        country: "United States of America",
                        lat: 45.1953,
                        lng: -99.9678,
                        name: "The Popping Planet Palace",
                        description: "The Popping Planet Palace was a Corn-Ship used for Kernel corn-themed operas. The Kernels were known for their dramatic performances about the history of corn. The living room is still set up as a stage, with alien props and costumes. Guests often report hearing ghostly Kernel voices singing corn-themed arias. The ship’s lighting system is programmed to create dramatic corn-stalk shadows. Unicorn Landing, where the stage is always set for corn-tastic performances.",
                        price: 125.00
                      },
                      {
                        ownerId: 6,
                        address: "81 Maize Maze Dr, Bevington, IA 50033",
                        city: "Bevington",
                        state: "IA",
                        country: "United States of America",
                        lat: 41.3789,
                        lng: -93.7917,
                        name: "The Kernel Kaleidoscope",
                        description: "The Kernel Kaleidoscope crashed while the Kernels were attempting to create a corn-themed amusement park. The ship's holographic projectors still display rides like the 'Corn Cob Coaster' and the 'Butter Churn Bumper Cars.' Guests have reported feeling phantom g-forces while watching the holographic rides. The ship's control panel still dispenses tickets, though they're only valid for interdimensional corn-rides. At Unicorn Landing, we bring the corn carnival to you.",
                        price: 135.00
                      },
                      {
                        ownerId: 7,
                        address: "37 Husk Hideaway Rd, Rapelje, MT 59072",
                        city: "Rapelje",
                        state: "MT",
                        country: "United States of America",
                        lat: 46.1017,
                        lng: -109.5292,
                        name: "The Silken Starlight Sanctuary",
                        description: "The Silken Starlight Sanctuary was a Corn-Ship used as a Kernel spa. The Kernels believed corn silk had healing properties. You’ll find vats of corn silk-infused lotions and potions in the bathrooms. Guests have reported feeling unusually relaxed after staying here, and some claim their hair has taken on a golden hue. The ship's aromatherapy system still dispenses corn silk-scented mist. Unicorn Landing, where relaxation is always corn-silk smooth.",
                        price: 150.00
                      },
                      {
                        ownerId: 8,
                        address: "68 Cob Corner Ln, Emblem, WY 82422",
                        city: "Emblem",
                        state: "WY",
                        country: "United States of America",
                        lat: 44.5822,
                        lng: -108.5756,
                        name: "The Popped Pinnacle Pad",
                        description: "The Popped Pinnacle Pad was a Corn-Ship used as a Kernel mountain retreat. The Kernels loved to hike and explore the mountains, leaving behind corn-shaped hiking boots and maps. Guests have reported seeing Kernel ghosts climbing the nearby hills, carrying corn-shaped walking sticks. The ship's telescope is still calibrated to view Maize-7, but only on clear nights. At Unicorn Landing, we reach for the corn-shaped stars.",
                        price: 145.00
                      },
                      {
                        ownerId: 9,
                        address: "12 Maize Meadow Rd, McHenry, ND 58464",
                        city: "McHenry",
                        state: "ND",
                        country: "United States of America",
                        lat: 47.6447,
                        lng: -98.7917,
                        name: "The Grainy Galaxy Getaway",
                        description: "The Grainy Galaxy Getaway was a Corn-Ship used for Kernel stargazing. The Kernels were fascinated by the constellations, especially those that resembled corn. The ship's observatory is still functional, and guests have reported seeing strange corn-shaped constellations. The ship's communication system occasionally receives messages from Maize-7, though they're always in Kernel code. At Unicorn Landing, we explore the corn-shaped universe.",
                        price: 130.00
                      },
                        {
                          ownerId: 10,
                          address: "45 Kernel Karavan Rd, Tendoy, ID 83468",
                          city: "Tendoy",
                          state: "ID",
                          country: "United States of America",
                          lat: 44.7556,
                          lng: -113.8833,
                          name: "The Golden Grain Grandeur",
                          description: "The Golden Grain Grandeur was a luxury Corn-Ship used by Kernel royalty. The Kernels of Maize-7 had a very complex class system and this ship belonged to the highest class of Kernels. You'll find ornate corn-silk tapestries and golden corn-kernel mosaics throughout the ship. Guests have reported feeling a sense of regal presence, and some claim to have seen Kernel ghosts in fancy corn-silk robes. The ship's dining hall still features a giant corn-shaped chandelier. At Unicorn Landing, we treat you like corn royalty.",
                          price: 160.00
                        },
                        {
                          ownerId: 11,
                          address: "72 Husk Haven Hwy, Shaniko, OR 97057",
                          city: "Shaniko",
                          state: "OR",
                          country: "United States of America",
                          lat: 45.0061,
                          lng: -120.7519,
                          name: "The Shucked Serenity Suite",
                          description: "The Shucked Serenity Suite was a Corn-Ship used as a Kernel retreat for relaxation. The Kernels of Maize-7 were very stressed out and needed to be able to relax. You'll find meditation cushions made of corn husks and calming corn-silk incense burners throughout the ship. Guests have reported feeling incredibly peaceful and rejuvenated after staying here, and some claim to have heard Kernel chants in the wind. The ship's zen garden still features a corn-shaped fountain. Unicorn Landing, where serenity is always in season.",
                          price: 155.00
                        },
                        {
                          ownerId: 12,
                          address: "29 Cob Corner Cir, Vina, CA 95992",
                          city: "Vina",
                          state: "CA",
                          country: "United States of America",
                          lat: 39.9575,
                          lng: -122.0289,
                          name: "The Popped Paradise Pad",
                          description: "The Popped Paradise Pad was a Corn-Ship used for Kernel vacations. The Kernels of Maize-7 loved to travel. You'll find postcards from various corn-themed planets and souvenirs made of corn throughout the ship. Guests have reported feeling a sense of wanderlust and adventure after staying here, and some claim to have seen Kernel ghosts in Hawaiian shirts. The ship's entertainment system still plays corn-themed music. At Unicorn Landing, we take you on a corn-tastic getaway.",
                          price: 170.00
                        },
                        {
                          ownerId: 13,
                          address: "56 Maize Maze Manor, Skull Valley, AZ 86338",
                          city: "Skull Valley",
                          state: "AZ",
                          country: "United States of America",
                          lat: 34.5442,
                          lng: -112.7844,
                          name: "The Silken Starlight Sanctuary",
                          description: "The Silken Starlight Sanctuary was a Corn-Ship used as a Kernel observatory. The Kernels of Maize-7 were very interested in space. You'll find powerful telescopes and star charts made of corn silk throughout the ship. Guests have reported seeing strange corn-shaped constellations and feeling a connection to the universe after staying here, and some claim to have seen Kernel ghosts in astronaut suits. The ship's navigation system still tries to plot a course to Maize-7. Unicorn Landing, where the stars are always corn-shaped.",
                          price: 165.00
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
