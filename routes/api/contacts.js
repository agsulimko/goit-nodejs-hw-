const express = require("express");
const ctrl = require("../../controllers/contacts");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.joiSchema), ctrl.add);

router.put(
  "/:contactId",
  authenticate,

  validateBody(schemas.joiSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.favoriteJoiSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, ctrl.deleteById);
// router.get("/:favorite", authenticate, ctrl.getByFaforite);

module.exports = router;
