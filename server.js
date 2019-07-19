require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const mongoose = require("mongoose");
const mongoURL = process.env.PROD_MONGODB || "mongodb://localhost:27017/googlebooks"
mongoose.connect(mongoURL, {useNewUrlParser: true})
  .then(() => {
    console.log("🗄 ==> Successfully connected to mongoDB.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });

require("./routes/api-routes")(app);

app.listen(PORT, () => {
  console.log(`world ==> API server now on port ${PORT}!`);
});