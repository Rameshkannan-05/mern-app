const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Record = require("./models/Record");

mongoose
  .connect("mongodb://localhost:27017/mern-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Seeding database...");
    await Record.deleteMany({}); // Clear existing records

    const records = [];
    for (let i = 0; i < 50; i++) {
      records.push({
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        date: faker.date.past(2),
        status: faker.helpers.arrayElement(["active", "inactive"]),
      });
    }

    await Record.insertMany(records);
    console.log("Seeded 50 records");
    process.exit();
  })
  .catch((err) => console.error(err));
