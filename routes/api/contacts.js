const express = require("express");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   const allContacts = await contacts.listContacts();
//   res.json(allContacts);
// });

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    res.status(500).json({ mesege: "Server error" });
  }
});
// router.get("/:contactId", async (req, res, next) => {
//   const getContacts = await contacts.getContactById(id);
//   res.json(getContacts);
// });
router.get("/:contactId", async (req, res, next) => {
  try {
    // console.log(req.params);
    const { contactId } = req.params;
    const getContacts = await contacts.getContactById(contactId);
    if (!getContacts) {
      throw HttpError(404, "Not Found");
      // return res.status(404).json({ mesege: "Not found" });
      // const error = new Error("Not Found");
      // error.status = 404;
      // throw error;
    }
    res.json(getContacts);
  } catch (error) {
    // res.status(500).json({ mesege: "Server error" });
    // const { status = 500, message = "Server error" } = error;
    //   res.status(500).json({ message: "Server error" });

    // console.log(req.params);
    next(error); // Шукає Обробник помилок
  }
});

router.post("/", async (req, res, next) => {
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
});
// name, email, phone;
router.delete("/:contactId", async (req, res, next) => {
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
});

router.put("/:contactId", async (req, res, next) => {
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
  // const updateContacts = await contacts.updateContacts(id, req.body);
  // res.json(updateContacts);
});

module.exports = router;
// { message: "template message" }
