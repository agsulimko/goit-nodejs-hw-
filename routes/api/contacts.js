const express = require("express");
const ctrl = require("../../controllers/contacts");

// const contacts = require("../../models/contacts");
// const { HttpError } = require("../../helpers");
// const Joi = require("joi");

const { validateBody } = require("../../middlewares");
// const { joiSchema } = require("../../models/contacts");
const schemas = require("../../schemas/contacts");

const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// favorite: Joi.boolean().required(),
// });

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
