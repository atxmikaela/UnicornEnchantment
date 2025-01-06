const express = require("express");
const { SpotImage, Spot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router({ mergeParams: true });


router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imageId = req.params.imageId;
  const userId = req.user.id;

  try {
    const image = await SpotImage.findByPk(imageId, {
      include: {
        model: Spot,
        attributes: ["ownerId"],
      },
    });

    if (!image) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    if (image.Spot.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: Spot does not belong to current user" });
    }

    await image.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
