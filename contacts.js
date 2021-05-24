const { X_OK } = require("constants");
const { KeyObject } = require("crypto");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

//путь к файле contacts.json
const contactsPath = path.join(__dirname, "./db/contacts.json");

// полный список контактов
function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    // const usersAll = JSON.parse(data);
    console.table(JSON.parse(data));
    //     // return usersAll;       //почему не работает return?
  });
  // return JSON.parse(data);
}

//________________________________________
//Почему эта функция не работает??
// async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath, "utf8");
//     const result = JSON.parse(data);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }
// const w = await listContacts();
// console.table(w);
//------------------------------------------

//получаеm id юзера
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    //с помощью перебора массива находим id в списке контакта
    const contactByID = contacts.find((contact) => contact.id === contactId);
    console.log(contactByID);
  });
}

//удаляем контакт
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    //с помощью фильтра удаляем id из списка контакта
    const notDeletedСontact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    console.table(notDeletedСontact);

    // почему не переписывает контакты?
    // fs.writeFile(contactsPath, notDeletedСontact, (err) => {
    //   if (err) throw err;
    // });
  });
}

//добавляем контакт
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;

    const contacts = JSON.parse(data);
    const contactNew = { id: shortid.generate(), name, email, phone };
    const contactsList = JSON.stringify([contactNew, ...contacts], null, "\t");
    //добавляем контакт в список
    fs.writeFile(contactsPath, contactsList, (err) => {
      if (err) throw err;
    });
  });
}
try {
  addContact();
} catch (error) {
  next(error);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
