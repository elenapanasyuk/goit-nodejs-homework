import * as fs from "fs/promises";
import * as path from "path";
import { handleError } from "../lib/handleerror.js";
import createDirname from "../lib/dirname.js";
import shortid from "shortid";

const { __dirname } = createDirname(import.meta.url);

const contactsPath = path.join(__dirname, "..", "..", "/db/contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data.toString()));
  } catch (error) {
    handleError(error);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return console.log(`This ID ${contactId} is not found`);
    }
    console.table(contact);
  } catch (error) {
    handleError(error);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (contacts.length === updatedContacts.length) {
      return console.log(`This ID ${contactId} is not found`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log(`Contact with ID ${contactId} was removed`);
  } catch (error) {
    handleError(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const newContact = { id: shortid.generate(), name, email, phone };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log(`Contact was added, contacts were updated`);
  } catch (error) {
    handleError(error);
  }
}
