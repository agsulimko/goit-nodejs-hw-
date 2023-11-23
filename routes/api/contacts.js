const express = require("express");

// const contacts = require("../../models/contacts");
// const { HttpError } = require("../../helpers");
// const Joi = require("joi");

const ctrl = require("../../controllers/contacts");
const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// favorite: Joi.boolean().required(),
// });

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.updateById);

module.exports = router;
