const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Inventory = require('../../models/inventoryModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful.');
  })
  .catch((err) => {
    console.log(`DB connection error:${err}`);
  });

const inventory = JSON.parse(
  fs.readFileSync(`${__dirname}/inventory-data.json`, 'utf-8'),
);
// const supplier = JSON.parse(
//   fs.readFileSync(`${__dirname}/supplier-data.json`, 'utf-8'),
// );

const importData = async () => {
  try {
    await Inventory.create(inventory);
    // await Supplier.create(supplier);
    console.log('Data Loaded Successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Inventory.deleteMany();
    // await Supplier.deleteMany();
    console.log('Data Deleted Successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
