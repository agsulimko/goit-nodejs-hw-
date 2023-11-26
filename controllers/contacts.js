const { HttpError, ctrlWrapper } = require("../helpers");

const { Contacts } = require("../models/contacts");

const getAll = async (req, res, next) => {
  const result = await Contacts.find({});
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contacts.findById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contacts.create(req.body);

  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  console.log(req.params);
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Delete success!",
    data: { result },
  });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    throw HttpError(400, "Missing field favorite");
  }

  console.log(favorite);
  const result = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

// const updateStatusContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const { favorite } = req.body;
//   // ??????? favorites(favorite, contactId);
//   if (!favorite)
//     res.json({
//       status: "400 bad request",
//       code: 400,
//       message: "missing field favorite",
//     });
//   console.log(favorite);
//   const result = await Contacts.findByIdAndUpdate(
//     contactId,
//     { favorite },
//     { new: true }
//   );

//   if (!result) {
//     throw HttpError(404, `Contact with id= ${contactId} Not Found`);
//   }

//   res.json({
//     status: "uccess",
//     code: 200,
//      data: { result },
//   });
// };
