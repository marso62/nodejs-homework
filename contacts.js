const fs = require("fs");
const path = require("path");

//путь к файле contacts.json
const contactsPath = path.join(__dirname, "./db/contacts.json");

// console.log(contactsPath);

// TODO: задокументировать каждую функцию
function listContacts() {
  // выводит в консоль список контактов
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const usersAll = JSON.parse(data);
    console.table(usersAll);
    // return usersAll;       //почему не работает return?
  });
}

// console.table(listContacts());
// listContacts();

//получаеm id юзера
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data.toString());
    //с помощью перебора массива находим id в списке контакта
    const userByID = users.find((user) => user.id === contactId);
    console.log(userByID);
  });
}

// getContactById(3);

//получаеm id юзера
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    // перебором находим удаляемого юзера
    const users = JSON.parse(data.toString());
    const userByID = users.find((user) => user.id === contactId);
    // console.table(users);
    // console.log(userByID);

    //убираем из списка удаленного пользователя
    const notDeletedUsers = users.filter((user) => user.id !== contactId);
    // return notDeletedUsers;
    console.table(notDeletedUsers);
  });

  //как удалить пользователя с json?
  // fs.writeFile(contactsPath, notDeletedUsers, "utf8", callback);
  // console.table(JSON.parse(data));
}

// removeContact(2);

function addContact(name, email, phone) {
  // fs.writeFile()
  //   // ...твой код
  //   console.log();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
