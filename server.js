const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

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

const port = 8000;
app.listen(port, () => {
  console.log('App Running on port 8000');
});
