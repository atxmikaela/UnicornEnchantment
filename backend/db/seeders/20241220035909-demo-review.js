'use strict';
const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
  { spotId: 1, userId: 3, review: "This place was the greatest experience ever! The butter dispenser whispered sweet nothings in binary code, and I swear I saw a Kernel ghost doing the tango in the bathroom. 5 stars!", stars: 5 },
  { spotId: 1, userId: 7, review: "I came for the butter, stayed for the interdimensional corn husks. The popping noises kept me up, but in a good way? Like a cosmic lullaby. 4 stars.", stars: 4 },
  { spotId: 1, userId: 12, review: "Tried whispering to the control panel, got sprayed with warm butter. Worth it. I now speak fluent Kernel. 5 stars, would get buttered again.", stars: 5 },
  { spotId: 1, userId: 2, review: "The bathroom butter vats were a spiritual experience. I've never felt so smooth. The Kernel ghost gave me stock tips. 6 stars if I could.", stars: 5 },
  { spotId: 1, userId: 9, review: "My dog ate a Kernel artifact and now he only barks in morse code. The butter was divine. 3 stars, dog's a genius now.", stars: 3 },
  { spotId: 2, userId: 5, review: "I challenged a husk dummy to a duel. It won. I learned humility and the ancient art of Husk-Fu. 5 stars.", stars: 5 },
  { spotId: 2, userId: 11, review: "The Kernel ghosts taught me how to levitate husks. My life is forever changed. The meditation chamber is legit. 4 stars.", stars: 4 },
  { spotId: 2, userId: 1, review: "Had a vision of the Great Corn God. He said, 'Eat more butter.' I obeyed. 5 stars.", stars: 5 },
  { spotId: 2, userId: 8, review: "The spectral husks tried to steal my socks. They were very polite about it. 3 stars. The husks were very soft.", stars: 3 },
  { spotId: 2, userId: 14, review: "I now communicate via corn husk semaphore. The Sanctuary is a portal. 5 stars, I'm never leaving.", stars: 5 },
  { spotId: 3, userId: 4, review: "The half-eaten corn cob spoke to me. It told me the secrets of the universe. 5 stars, and I'm now a prophet.", stars: 5 },
  { spotId: 3, userId: 10, review: "The holographic cornfields tried to convince me I was a corn stalk. It was very convincing. 4 stars, existential crisis pending.", stars: 4 },
  { spotId: 3, userId: 6, review: "Tried to reroute to Maize-7. Ended up in a cornfield in Kansas. No regrets. 5 stars, best detour ever.", stars: 5 },
  { spotId: 3, userId: 13, review: "The Corn-GPS system gave me winning lottery numbers. I'm now a millionaire. 2 stars, navigation is too accurate.", stars: 2 },
  { spotId: 3, userId: 15, review: "The giant corn cob is my new best friend. We had long conversations about butter. 5 stars, cob is a great listener.", stars: 5 },
  { spotId: 4, userId: 7, review: "Floating muffins are the future of breakfast. I'm starting a floating muffin restaurant. 5 stars, innovation at its finest.", stars: 5 },
  { spotId: 4, userId: 2, review: "The Kernel muffin recipes are written in a language only my cat understands. He's now a baking genius. 4 stars, cat is Gordon Ramsay now.", stars: 4 },
  { spotId: 4, userId: 9, review: "The corn-based spices gave me telekinetic abilities. I can now move muffins with my mind. 5 stars, spice power!", stars: 5 },
  { spotId: 4, userId: 1, review: "Tried to replicate the Kernel muffins. My kitchen exploded. 1 star, too authentic.", stars: 1 },
  { spotId: 4, userId: 12, review: "The ship's gravity generator turned my hair into a giant corn stalk. 5 stars, best hair day ever.", stars: 5 },
  { spotId: 5, userId: 11, review: "The Kernel opera ghosts serenaded me with corn-themed arias. I wept tears of joy. 5 stars, best concert ever.", stars: 5 },
  { spotId: 5, userId: 8, review: "Tried to join the Kernel opera. My voice cracked. They were very polite about it. 3 stars, my voice is not alien-ready.", stars: 3 },
  { spotId: 5, userId: 14, review: "The corn-stalk shadows gave me fashion inspiration. I'm now a corn-themed runway model. 5 stars, high fashion!", stars: 5 },
  { spotId: 5, userId: 4, review: "The alien props turned my dog into a corn-themed actor. He's now a Hollywood star. 2 stars, dog is too famous now.", stars: 2 },
  { spotId: 5, userId: 10, review: "The Kernel voices told me my future. It involves a lot of corn. 5 stars, prophetic corn!", stars: 5 },
  { spotId: 6, userId: 13, review: "The holographic Corn Cob Coaster gave me motion sickness, but it was worth it. 5 stars, cosmic roller coaster!", stars: 5 },
  { spotId: 6, userId: 15, review: "The Butter Churn Bumper Cars turned my car into a giant butter churn. My commute is now delicious. 4 stars, buttery commute!", stars: 4 },
  { spotId: 6, userId: 7, review: "Tried to ride the holographic rides. Ended up in a corn maze. 1 star, too immersive.", stars: 1 },
  { spotId: 6, userId: 2, review: "The Kernel amusement park tickets gave me access to interdimensional corn-rides. I rode a corn-shaped dragon. 5 stars, best ride ever.", stars: 5 },
  { spotId: 6, userId: 9, review: "The phantom g-forces made me float. I'm now a professional floater. 5 stars, weightless wonder!", stars: 5 },
  { spotId: 7, userId: 1, review: "The corn silk lotions turned my skin into gold. I'm now a golden god. 5 stars, golden glow!", stars: 5 },
  { spotId: 7, userId: 12, review: "The corn silk-scented mist gave me psychic powers. I can now read corn thoughts. 4 stars, corn telepathy!", stars: 4 },
  { spotId: 7, userId: 11, review: "Tried to drink the corn silk-infused lotions. My hair turned into a corn field. 1 star, too hydrating.", stars: 1 },
  { spotId: 7, userId: 8, review: "The Kernel spa treatments gave me eternal youth. I'm now a corn-silk immortal. 5 stars, youthful corn!", stars: 5 },
  { spotId: 7, userId: 14, review: "The aromatherapy system turned my dreams into corn-themed musicals. 5 stars, corn-tastic dreams!", stars: 5 },
  { spotId: 8, userId: 4, review: "The corn-shaped hiking boots gave me super-speed. I'm now a corn-powered marathon runner. 5 stars, speedy corn!", stars: 5 },
  { spotId: 8, userId: 15, review: "Tried to view Maize-7 through the telescope. Saw a giant corn-shaped pizza. It was beautiful. 5 stars, cosmic pizza!", stars: 5 },
  { spotId: 8, userId: 7, review: "The corn-shaped walking sticks gave me magical powers. I can now turn rocks into corn. 2 stars, too corny.", stars: 2 },
  { spotId: 9, userId: 2, review: "The corn-shaped constellations told me my destiny. It involves a lot of butter and space travel. 5 stars, cosmic butter!", stars: 5 },
  { spotId: 9, userId: 9, review: "The Maize-7 messages were written in a language only dolphins understand. My dolphin is now a translator. 4 stars, dolphin linguist!", stars: 4 },
  { spotId: 9, userId: 1, review: "Tried to send a message to Maize-7. My toaster tried to reply. 1 star, appliance rebellion!", stars: 1 },
  { spotId: 9, userId: 12, review: "The Kernel stargazing gave me visions of a corn-shaped galaxy. It was breathtaking. 5 stars, cosmic corn!", stars: 5 },
  { spotId: 9, userId: 11, review: "The ship's communication system turned my parrot into a space pirate. He now demands corn-shaped treasure. 5 stars, pirate parrot!", stars: 5 },
  { spotId: 10, userId: 8, review: "The golden corn-kernel mosaics gave me a sense of royalty. I'm now a corn king. 5 stars, royal corn!", stars: 5 },
  { spotId: 10, userId: 14, review: "The Kernel ghosts in corn-silk robes taught me how to walk on corn. I'm now a corn-walking master. 4 stars, corn-fu!", stars: 4 },
  { spotId: 10, userId: 4, review: "Tried to wear the corn-silk tapestries. They turned me into a golden corn mummy. 1 star, too fashionable.", stars: 1 },
  { spotId: 10, userId: 10, review: "The corn-shaped chandelier gave me the power to control light. I'm now a corn-powered lantern. 5 stars, light corn!", stars: 5 },
  { spotId: 10, userId: 13, review: "The Kernel royalty treated me like a corn commoner. It was surprisingly humbling. 5 stars, royal corn humility!", stars: 5 },
  { spotId: 11, userId: 15, review: "The corn husk meditation cushions gave me inner peace. I'm now a corn-zen master. 5 stars, zen corn!", stars: 5 },
  { spotId: 11, userId: 7, review: "The corn-silk incense gave me the ability to smell feelings. I can now smell sadness. 4 stars, emotional corn!", stars: 4 },
  { spotId: 11, userId: 2, review: "Tried to use the corn-silk incense burners. My house turned into a giant corn cob. 1 star, too aromatic.", stars: 1 },
  { spotId: 11, userId: 9, review: "The Kernel chants gave me the power to heal with corn silk. I'm now a corn-silk healer. 5 stars, healing corn!", stars: 5 },
  { spotId: 11, userId: 1, review: "The corn-shaped fountain gave me eternal youth. I'm now a corn-fountain immortal. 5 stars, youthful corn!", stars: 5 },
  { spotId: 12, userId: 12, review: "The corn-themed postcards gave me wanderlust. I'm now a corn-shaped traveler. 5 stars, corn travel!", stars: 5 },
  { spotId: 12, userId: 11, review: "The corn-shaped souvenirs gave me the ability to talk to corn. I'm now a corn whisperer. 4 stars, corn communication!", stars: 4 },
  { spotId: 12, userId: 8, review: "Tried to wear the Kernel Hawaiian shirts. They turned me into a corn-themed tourist trap. 1 star, too cheesy.", stars: 1 },
  { spotId: 12, userId: 14, review: "The Kernel ghosts in Hawaiian shirts taught me how to hula dance with corn. I'm now a corn-hula dancer. 5 stars, corn hula!", stars: 5 },
  { spotId: 12, userId: 4, review: "The corn-themed music gave me the power to control corn. I'm now a corn conductor. 5 stars, corn music!", stars: 5 },
  { spotId: 13, userId: 10, review: "The corn silk star charts gave me the ability to navigate by corn. I'm now a corn navigator. 5 stars, corn navigation!", stars: 5 },
  { spotId: 13, userId: 13, review: "The powerful telescopes gave me visions of corn-shaped aliens. I'm now a corn-voyeur. 4 stars, alien corn!", stars: 4 },
  { spotId: 13, userId: 15, review: "Tried to plot a course to Maize-7. Ended up on Mars. 1 star, wrong turn.", stars: 1 },
  { spotId: 13, userId: 7, review: "The Kernel ghosts in astronaut suits taught me how to moonwalk on corn. I'm now a corn moonwalker. 5 stars, corn moonwalk!", stars: 5 },
  { spotId: 13, userId: 2, review: "The ship's navigation system gave me the power to teleport with corn. I'm now a corn teleport. 5 stars, corn teleportation!", stars: 5 },

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
