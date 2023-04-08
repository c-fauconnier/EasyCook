const mongoose = require("mongoose");
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
};

mongoose.connect(process.env.MONGO_URL, options).then((res) => {
  if (res) {
    console.log("MongoDB connection succeeded.");
  } else {
    console.log(
      "Error in MongoDB connection :" + JSON.stringify(err, undefined, 2)
    );
  }
});
