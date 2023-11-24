const express = require("express");
const ctrl = require("../../controllers/contacts");

// const contacts = require("../../models/contacts");
// const { HttpError } = require("../../helpers");
// const Joi = require("joi");

const { validateBody } = require("../../middlewares");
const schemas = require("../../models/contacts");
// const schemas = require("../../schemas-DELETE/contacts");

const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// favorite: Joi.boolean().required(),
// });

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
