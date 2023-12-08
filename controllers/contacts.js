const { HttpError, ctrlWrapper } = require("../helpers");

const { Contacts } = require("../models/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { favorite } = req.body;
  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;

  const filter = !favorite ? { owner, favorite: true } : { owner };

  const result = await Contacts.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

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

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contacts.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  // const owner = req.user._id;
  // console.log("owner=>", owner);
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} Not Found`);
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
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
