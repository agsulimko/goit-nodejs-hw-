const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const writeFile = async (filePath, data) => {
  await fs.writeFile(filePath, data);
};
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContacts = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    const [removedContacts] = contacts.splice(index, 1);
    writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContacts;
  } else {
    return null;
  }
};

const addContacts = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);
  writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContacts = async (contactId, name, email, phone) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts[index] = { contactId, name, email, phone };
    writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[index];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContacts,
  addContacts,
  updateContacts,
};
