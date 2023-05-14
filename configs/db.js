require("dotenv").config();

const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successful Connection");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// connection();
module.exports = { connection };
