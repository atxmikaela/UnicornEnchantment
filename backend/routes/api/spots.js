const router = require("express").Router();
const { Spot, User, Booking, SpotImage, Review, ReviewImage, sequelize } = require("../../db/models");
const bookingsRouter = require("./booking");
const reviewsRouter = require("./reviews");

const { requireAuth } = require("../../utils/auth");
const { Op, fn, col, Sequelize } = require("sequelize");
const { check, query, body } = require("express-validator");
query;
const { handleValidationErrors } = require("../../utils/validation");
const { userAttributes, imageAttributes, spotAttributes, } = require("../../utils/attributes");

const validateSpot = [
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  body("city").exists({ checkFalsy: true }).withMessage("City is required"),
  body("state").exists({ checkFalsy: true }).withMessage("State is required"), // 400
  body("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"), // 400
  body("lat")
    .optional({ nullable: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90")
    .toFloat(),
  body("lng")
    .optional({ nullable: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180")
    .toFloat(),
  body("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  body("price")
    .exists({ checkFalsy: true })
    .isFloat({ gt: 0 })
    .withMessage("Price per day must be a positive number")
    .toInt(10),
  handleValidationErrors,
];

const validateQueryParams = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1")
    .toInt(10),
  query("size")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be between 1 and 20")
    .toInt(10),
  query("minLat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Minimum latitude is invalid")
    .toFloat(),
  query("maxLat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Maximum latitude is invalid")
    .toFloat(),
  query("minLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Minimum longitude is invalid")
    .toFloat(),
  query("maxLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Maximum longitude is invalid")
    .toFloat(),
  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0")
    .toFloat(),
  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0")

    .custom((value, { req }) => {
      const minPrice = parseFloat(req.query.minPrice);
      const maxPrice = parseFloat(value);
      if (!isNaN(minPrice) && maxPrice < minPrice) {
        throw new Error(
          "Maximum price must be greater than or equal to minimum price"
        );
      }
      return true;
    })
    .toFloat(),
  handleValidationErrors,
];

const validateBooking = [

  check("startDate")
    .isISO8601()
    .withMessage("Invalid start date format")
    .custom((startDate) => {
      if (new Date(startDate) < new Date()) {
        throw new Error("startDate cannot be in the past");
      } else if (new Date(startDate) >= new Date(req.body.endDate)) {
        throw new Error("startDate cannot be on or after endDate");
      }
      return true;
    }),
  check("endDate")
    .isISO8601()
    .withMessage("Invalid end date format")
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }),
];



const validateSpotImage = [
  body("url").exists({ checkFalsy: true }).withMessage("Url is required"),
  body("preview")
    .exists({ checkFalsy: true })
    .isBoolean()
    .withMessage("Preview is required"),
];

router.use("/:spotId/bookings", bookingsRouter);
router.use("/:spotId/reviews", reviewsRouter);


router.get("/", validateQueryParams, async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  const limit = size ?? 20;
  const offset = page ? (page - 1) * size : 0;
  const where = {};

  if (minLat !== undefined && maxLat !== undefined) {
    where.lat = {
      [Op.between]: [minLat, maxLat],
    };
  } else if (minLat !== undefined) {
    where.lat = {
      [Op.gte]: minLat,
    };
  } else if (maxLat !== undefined) {
    where.lat = {
      [Op.lte]: maxLat,
    };
  }

  if (minLng !== undefined && maxLng !== undefined) {
    where.lng = {
      [Op.between]: [minLng, maxLng],
    };
  } else if (minLng !== undefined) {
    where.lng = {
      [Op.gte]: minLng,
    };
  } else if (maxLng !== undefined) {
    where.lng = {
      [Op.lte]: maxLng,
    };
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    where.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  } else if (minPrice !== undefined) {
    where.price = {
      [Op.gte]: minPrice,
    };
  } else if (maxPrice !== undefined) {
    where.price = {
      [Op.lte]: maxPrice,
    };
  }

  try {
    const spots = await Spot.findAll({
      where,
      limit,
      offset,
      include: [
        {
          model: Review,
          attributes: ["stars"],
        },
        {
          model: SpotImage,
          attributes: ["url", "preview"],
          required: false,
        },
      ],
    });

    let spotsList = spots.map((spot) => spot.toJSON());


    spotsList.forEach((spot) => {

      let totalStars = 0;
      let reviewCount = 0;
      spot.Reviews.forEach((review) => {
        totalStars += review.stars;
        reviewCount++;
      });

      if (reviewCount > 0) {
        spot.avgRating = parseFloat((totalStars / reviewCount).toFixed(1));
      } else {
        spot.avgRating = null;
      }
      delete spot.Reviews;


      spot.SpotImages.forEach((image) => {
        if (image.preview === true) {
          spot.previewImage = image.url;
        }
      });
      if (!spot.previewImage) {
        spot.previewImage = "No preview image available";
      }
      delete spot.SpotImages;

      return spot;
    });

    res.json({ Spots: spotsList, page, size });
  } catch (error) {
    next(error);
  }
});


router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const spots = await Spot.findAll({
      where: { ownerId: userId },
      include: [
        {
          model: Review,
          attributes: ["stars"],
          required: false,
        },
        {
          model: SpotImage,
          attributes: ["url", "preview"],
          required: false,
        },
      ],
    });

    let spotsList = [];

    spots.forEach((spot) => {
      spotsList.push(spot.toJSON());
    });

    const formattedSpots = spotsList.map((spot) => {
      spot.SpotImages.forEach((image) => {
        if (image.preview === true) {
          spot.previewImage = image.url;
        }
      });
      if (!spot.previewImage) {
        spot.previewImage = "No preview image available";
      }
      delete spot.SpotImages;

      let totalStars = 0;
      let reviewCount = 0;
      spot.Reviews.forEach((review) => {
        totalStars += review.stars;
        reviewCount++;
      });

      if (reviewCount > 0) {
        spot.avgRating = parseFloat((totalStars / reviewCount).toFixed(1));
      } else {
        spot.avgRating = null;
      }
      delete spot.Reviews;
      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.avgRating,
        previewImage: spot.previewImage,
      };
    });
    res.json({ Spots: formattedSpots });
  } catch (error) {
    next(error);
  }
});


router.get("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;

  const spot = await Spot.findOne({
    where: { id: spotId },
    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: Review,
        attributes: ["stars"],
      },
    ],
  });
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const spotDetails = spot.toJSON();

  let totalStars = 0;
  let reviewCount = 0;

  spotDetails.Reviews.forEach((review) => {
    totalStars += review.stars;
    reviewCount++;
  });

  spotDetails.avgStarRating =
    reviewCount > 0 ? parseFloat((totalStars / reviewCount).toFixed(1)) : null;
  spotDetails.numReviews = reviewCount;

  spotDetails.ownerId = spotDetails.Owner.id;

  const formattedSpotImages = spotDetails.SpotImages.map((image) => {
    return {
      id: image.id,
      url: image.url,
      preview: image.preview,
    };
  });

  const formattedResponse = {
    id: spotDetails.id,
    ownerId: spotDetails.ownerId,
    address: spotDetails.address,
    city: spotDetails.city,
    state: spotDetails.state,
    country: spotDetails.country,
    lat: spotDetails.lat,
    lng: spotDetails.lng,
    name: spotDetails.name,
    description: spotDetails.description,
    price: spotDetails.price,
    createdAt: spotDetails.createdAt,
    updatedAt: spotDetails.updatedAt,
    numReviews: spotDetails.numReviews,
    avgStarRating: spotDetails.avgStarRating,
    SpotImages: formattedSpotImages,
    Owner: {
      id: spotDetails.Owner.id,
      firstName: spotDetails.Owner.firstName,
      lastName: spotDetails.Owner.lastName,
    },
  };
  res.status(200).json(formattedResponse);
});


router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const userId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== userId) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to add images to this spot",
      });
    }

    const newImage = await SpotImage.create({
      spotId: spot.id,
      url,
      preview,
    });

    formattedImage = {
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    };
    res.status(201).json(formattedImage);
  } catch (error) {
    next(error);
  }
});


router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price, previewImage, firstSpotImg, secondSpotImg, thirdSpotImg, fourthSpotImg } =
    req.body;


  try {
    const newSpot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    if(previewImage){

      await SpotImage.create({spotId: newSpot.id, url: previewImage, preview: true});
  }
  if(firstSpotImg){

      await SpotImage.create({spotId: newSpot.id, url: firstSpotImg, preview: false});
  }
  if(secondSpotImg){
      await SpotImage.create({spotId: newSpot.id, url: secondSpotImg, preview: false});
  }
  if(thirdSpotImg){
      await SpotImage.create({spotId: newSpot.id, url: thirdSpotImg, preview: false});
  }
  if(fourthSpotImg){
      await SpotImage.create({spotId: newSpot.id, url: fourthSpotImg, preview: false});
  }

    res.status(201).json(newSpot);
  } catch (error) {
    console.error("Error creating spot:", error);
    next(error);
  }
});


router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const userId = req.user.id;
  const { url, preview } = req.body;
  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== userId) {
      return res.status(403).json({
        message: "Forbidden: Spot does not belong to user",
      });
    }

    const image = await SpotImage.create({
      spotId: spot.spotId,
      url,
      preview,
    });

    return res.json({ id: image.id, url: image.url, preview: image.preview });
  } catch (error) {
    next(error);
  }
});


router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== ownerId) {
      return res.status(403).json({
        message: "Forbidden: Spot does not belong to user",
      });
    }

    await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    await spot.save();

    res.json({
      id: spot.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
  } catch (error) {
    next(error);
  }
});


router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const ownerId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== ownerId) {
      return res.status(403).json({
        message: "Forbidden: Spot does not belong to user",
      });
    }

    await spot.destroy();

    res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:spotId/reviews", async (req, res, next) => {
  const spotId = req.params.spotId;

  try {
    const spot = await Spot.findOne({
      where: { id: spotId },
      include: [
        {
          model: Review,
          attributes: [
            "id",
            "userId",
            "spotId",
            "review",
            "stars",
            "createdAt",
            "updatedAt",
          ],
          include: [
            {
              model: User,
              attributes: userAttributes,
            },
            {
              model: ReviewImage,
              attributes: imageAttributes,
            },
          ],
        },
      ],
    });


    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    const reviews = spot.Reviews.map((review) => {
      return {
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        User: {
          id: review.User.id,
          firstName: review.User.firstName,
          lastName: review.User.lastName,
        },
        ReviewImages: review.ReviewImages.map((image) => ({
          id: image.id,
          url: image.url,
        })),
      };
    });

    res.json({ Reviews: reviews });
  } catch (error) {
    next(error);
  }
});


router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const uid = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const isOwner = spot.ownerId === uid;

    let bookings;


    if (isOwner) {
      bookings = await Booking.findAll({
        where: { spotId },
        include: [
          {
            model: User,
            attributes: userAttributes,
          },
        ],
      });
    } else {
      bookings = await Booking.findAll({
        where: { spotId },
        attributes: ["spotId", "startDate", "endDate"],
      });
    }

    return res.json({ Bookings: bookings });
  } catch (error) {
    next(error);
  }
});

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  try {

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }


    if (spot.ownerId === userId) {
      return res.status(403).json({ message: "Cannot book your own spot" });
    }


    const conflict = await Booking.findOne({
      where: {
        spotId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [startDate, endDate] },
          },
          {
            endDate: { [Op.between]: [startDate, endDate] },
          },
          {
            startDate: { [Op.lte]: startDate },
            endDate: { [Op.gte]: endDate },
          },

          {
            endDate: startDate,
          },
        ],
      },
    });

    if (conflict) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }


    const booking = await Booking.create({
      spotId: spot.id,
      userId,
      startDate,
      endDate,
    });


    return res.status(201).json({
      id: booking.id,
      spotId: booking.spotId,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
