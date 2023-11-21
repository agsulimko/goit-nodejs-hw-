const mongoose = require("mongoose");
const app = require("./app");
const DB_PASSWORD = encodeURIComponent("Z@TNhTsS99tR6!Q");

const DB_HOST = `mongodb+srv://agsulimko:${DB_PASSWORD}@clusteragsulimko1.6tm1onp.mongodb.net/hw03-mongodb?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST).then(() => {
  app
    .listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
});
