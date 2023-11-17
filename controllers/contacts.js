// const contacts = require("../models/contacts");
// const { HttpError } = require("../helpers");
// const Joi = require("joi");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// const listContacts = async (req, res, next) => {
//   try {
//     const allContacts = await contacts.listContacts();
//     res.json(allContacts);
//   } catch (error) {
//     res.status(500).json({ mesege: "Server error" });
//   }
// };
// const getContactById = async (req, res, next) => {
//   try {
//     // console.log(req.params);
//     const { contactId } = req.params;
//     const getContacts = await contacts.getContactById(contactId);
//     if (!getContacts) {
//       throw HttpError(404, "Not Found");
//       // return res.status(404).json({ mesege: "Not found" });
//       // const error = new Error("Not Found");
//       // error.status = 404;
//       // throw error;
//     }
//     res.json(getContacts);
//   } catch (error) {
//     // res.status(500).json({ mesege: "Server error" });
//     // const { status = 500, message = "Server error" } = error;
//     //   res.status(500).json({ message: "Server error" });

//     // console.log(req.params);
//     next(error); // Шукає Обробник помилок
//   }
// };

// const addContacts = async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const addContacts = await contacts.addContacts(req.body);

//     res.status(201).json(addContacts);
//   } catch (error) {
//     next(error);
//   }
// };
// const removeContacts = async (req, res, next) => {
//   try {
//     console.log(req.params);
//     const { contactId } = req.params;
//     const removeContacts = await contacts.removeContacts(contactId);
//     if (!removeContacts) {
//       throw HttpError(404, "Not Found");
//     }
//     res.json({ message: "Delete succes!" });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateContacts = async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { contactId } = req.params;
//     console.log(contactId);
//     const updateContacts = await contacts.updateContacts(contactId, req.body);
//     console.log(updateContacts);
//     if (!updateContacts) {
//       throw HttpError(404, "Not Found");
//     }
//     res.json(updateContacts);
//   } catch (error) {
//     next(error);
//   }
// const updateContacts = await contacts.updateContacts(id, req.body);
// res.json(updateContacts);
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContacts,
//   addContacts,
//   updateContacts,
// };

// ==============================
// const books = require("../models/books");

// const { HttpError, ctrlWrapper } = require("../helpers");

// const getAll = async (req, res) => {
//   const result = await books.getAll();
//   res.json(result);
// };

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await books.getById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const add = async (req, res) => {
//   const result = await books.add(req.body);
//   res.status(201).json(result);
// };

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const result = await books.updateById(id, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const deleteById = async (req, res) => {
//   const { id } = req.params;
//   const result = await books.deleteById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   // res.status(204).send()
//   res.json({
//     message: "Delete success",
//   });
// };

// module.exports = {
//   getAll: ctrlWrapper(getAll),
//   getById: ctrlWrapper(getById),
//   add: ctrlWrapper(add),
//   updateById: ctrlWrapper(updateById),
//   deleteById: ctrlWrapper(deleteById),
// };
