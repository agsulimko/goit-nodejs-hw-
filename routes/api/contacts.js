const express = require("express");
const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.joiSchema), ctrl.add);

router.put("/:contactId", validateBody(schemas.joiSchema), ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.favoriteJoiSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
