const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    res.status(500).json({ mesege: "Server error" });
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getContacts = await contacts.getContactById(contactId);
    if (!getContacts) {
      throw HttpError(404, "Not Found");
    }
    res.json(getContacts);
  } catch (error) {
    next(error); // Шукає Обробник помилок
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const addContacts = await contacts.addContacts(req.body);

    res.status(201).json(addContacts);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    console.log(contactId);
    const updateContacts = await contacts.updateContacts(contactId, req.body);
    console.log(updateContacts);
    if (!updateContacts) {
      throw HttpError(404, "Not Found");
    }
    res.json(updateContacts);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactId } = req.params;
    const removeContacts = await contacts.removeContacts(contactId);
    if (!removeContacts) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Delete succes!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
