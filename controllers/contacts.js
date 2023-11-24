// const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
// const Joi = require("joi");
const { Contacts } = require("../models/contacts");
// виносимо схеми в окремий файл
// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   // favorite: Joi.bool(),
// });

const getAll = async (req, res, next) => {
  const allContacts = await Contacts.listContacts();
  // const allContacts = await Contacts.find({});
  res.json(allContacts);
};
// try {
//   const allContacts = await contacts.listContacts();
//   res.json(allContacts);
// } catch (error) {
//   res.status(500).json({ mesege: "Server error" });
// }

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const getContacts = await Contacts.getContactById(contactId);
  if (!getContacts) {
    throw HttpError(404, "Not Found");
  }
  res.json(getContacts);

  // try {
  //   const { contactId } = req.params;
  //   const getContacts = await contacts.getContactById(contactId);
  //   if (!getContacts) {
  //     throw HttpError(404, "Not Found");
  //   }
  //   res.json(getContacts);
  // } catch (error) {
  //   next(error); // Шукає Обробник помилок
  // }
};

const add = async (req, res, next) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const addContacts = await Contacts.addContacts(req.body);

  res.status(201).json(addContacts);
};

const updateById = async (req, res, next) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const { contactId } = req.params;
  console.log(contactId);
  const updateContacts = await Contacts.updateContacts(contactId, req.body);
  console.log(updateContacts);
  if (!updateContacts) {
    throw HttpError(404, "Not Found");
  }
  res.json(updateContacts);
};

const deleteById = async (req, res, next) => {
  console.log(req.params);
  const { contactId } = req.params;
  const removeContacts = await Contacts.removeContacts(contactId);
  if (!removeContacts) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "Delete succes!" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
