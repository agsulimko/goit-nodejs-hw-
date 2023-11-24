const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();
// const dotenv = require("dotenv");
// dotenv.config();

// const { DB_HOST } = require("./config");
// const DB_HOST =
//   "mongodb+srv://agsulimko:qw54JJJHJG787FFgfh@clusteragsulimko1.6tm1onp.mongodb.net/db-contacts?retryWrites=true&w=majority";
const { DB_HOST } = process.env;
// console.log(process.env);
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
