const { fakerEN_IN: faker } = require("@faker-js/faker");

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

console.log(firstName);
console.log(lastName);
