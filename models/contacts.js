const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().valid(true, false).required(),
});

const Contacts = model("contact", contactsSchema);

module.exports = { Contacts, joiSchema, favoriteJoiSchema };
