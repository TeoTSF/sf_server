const sequelize = require("../utils/connection");
const Users = require("../models/Users");
const Role = require("../models/Roles");
const Location = require("../models/Location");
const Sponsorship = require("../models/Sponsorship");
const initModels = require('../models');

const role = [{ name: "S admin" }, { name: "Admin" }, { name: "Profesional" }];

const location = [{name: "Batán"}, {name: "Colón"}]

const sponsor = [{sponsor: "Batán"}, {sponsor: "colón"}]

const users = [
  {
    firstname: "Marco",
    lastname: "Cardenas",
    email: "marco2616@gmail.com",
    password: "12345678",
    roleId: 1,
  },
  {
    firstname: "Carmen",
    lastname: "Gomez",
    email: "carmenluisag2011@gmail.com",
    password: "12345678",
    roleId: 1,
  },
  {
    firstname: "Carlos",
    lastname: "Messier",
    email: "messiercarlos1@gmail.com",
    password: "12345678",
    roleId: 1,
  },
];


async function seedCreate() {
  await Role.bulkCreate(role);
  await Users.bulkCreate(users);
  await Location.bulkCreate(location)
  await Sponsorship.bulkCreate(sponsor)
}

// agregar force: true a la configuración de Sequelize
initModels()
sequelize
  .sync({ force: true })
  .then(async () => {
    // console.log('Seeding database...');
    await seedCreate();
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  });
