const { HttpError, ctrlWrapper } = require("../helpers");

const { Contacts } = require("../models/contacts");

const getAll = async (req, res, next) => {
  const allContacts = await Contacts.find({});
  res.json(allContacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const getContacts = await Contacts.findById(contactId);

  if (!getContacts) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }
  res.json(getContacts);
};

const add = async (req, res, next) => {
  const addContacts = await Contacts.create(req.body);

  res.status(201).json(addContacts);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const updateContacts = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log(updateContacts);
  if (!updateContacts) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }
  res.json(updateContacts);
};

const deleteById = async (req, res, next) => {
  console.log(req.params);
  const { contactId } = req.params;
  const removeContacts = await Contacts.findByIdAndDelete(contactId);
  if (!removeContacts) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }
  res.json({
    status: "uccess",
    code: 200,
    message: "Delete success!",
    data: { removeContacts },
  });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite)
    res.json({
      status: "400 bad request",
      code: 400,
      message: "missing field favorite",
    });
  console.log(favorite);
  const updateContacts = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!updateContacts) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }

  res.json({
    status: "uccess",
    code: 200,
    data: { updateContacts },
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
