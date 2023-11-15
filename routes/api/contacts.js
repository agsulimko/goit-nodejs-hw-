const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const getContacts = await contacts.getContactById(id);
  res.json(getContacts);
});

router.post("/", async (req, res, next) => {
  const addContacts = await contacts.addContacts(name, email, phone);
  res.json(addContacts);
});

router.delete("/:contactId", async (req, res, next) => {
  const removeContacts = await contacts.removeContacts(id);
  res.json(removeContacts);
});

router.put("/:contactId", async (req, res, next) => {
  const updateContacts = await contacts.updateContacts(id, names, email, phone);
  res.json(updateContacts);
});

module.exports = router;
// { message: "template message" }
