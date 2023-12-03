const express = require("express");
const ctrl = require("../../controllers/contacts");

const { validateBody, authenticate, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", isValidId, authenticate, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.joiSchema), ctrl.add);

router.put(
  "/:contactId",
  isValidId,
  authenticate,

  validateBody(schemas.joiSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.favoriteJoiSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
