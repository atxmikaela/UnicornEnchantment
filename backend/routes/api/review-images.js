const express = require("express");
const router = express.Router({ mergeParams: true });
const { requireAuth, requireProperAuthorization } = require("../../utils/auth");
const { Review, ReviewImage } = require("../../db/models");
const { imageAttributes } = require("../../utils/attributes");


router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;
  const userId = req.user.id;

  try {

    const review = await Review.findByPk(reviewId);


    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== userId) {
      return res.status(403).json({
        message: "Forbidden: Review does not belong to current user",
      });
    }


    const imageCount = await ReviewImage.count({ where: { reviewId } });

    if (imageCount >= 10) {
      return res.status(403).json({
        message: "Maximum number of images for this resource was reached",
      });
    }


    const newImage = await ReviewImage.create({
      reviewId: review.id,
      url,
    });


    const formattedImage = {
      id: newImage.id,
      url: newImage.url,
    };

    res.status(201).json(formattedImage);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to add image",
      error: err.message,
    });
  }
});


router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imageId = req.params.imageId;
  const userId = req.user.id;

  try {

    const image = await ReviewImage.findByPk(imageId, {
      include: {
        model: Review,
        attributes: ["userId"],
      },
    });


    if (!image) {
      return res
        .status(404)
        .json({ message: "Review Image couldn't be found" });
    }


    if (image.Review.userId !== userId) {
      return res
        .status(403)
        .json({
          message: "Forbidden: Review Image does not belong to current user",
        });
    }

  
    await image.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
