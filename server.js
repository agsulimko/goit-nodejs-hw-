const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST } = require("./config");
// const dotenv = require("dotenv");
// dotenv.config();

// const DB_HOST =
//   "mongodb+srv://agsulimko:qw54JJJHJG787FFgfh@clusteragsulimko1.6tm1onp.mongodb.net/hw03-mongodb?retryWrites=true&w=majority";

// mongoose.set("strictQuery", true);

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
