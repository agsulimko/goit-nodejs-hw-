const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST } = require("./config");
// const DB_PASSWORD = encodeURIComponent("Z@TNhTsS99tR6!Q");

// const DB_HOST = `mongodb+srv://agsulimko:${DB_PASSWORD}@clusteragsulimko1.6tm1onp.mongodb.net/hw03-mongodb?retryWrites=true&w=majority`;

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
//  "engines": {
//     "node": ">=14.20.1"
//   },
