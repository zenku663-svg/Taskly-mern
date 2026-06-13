const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://taskadmin:mongo1234@cluster0.x2yhdpz.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("CONNECTED");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });