const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://kammarajay1:ajay1kammar@cluster0.kqko83l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB is Connected"))
  .catch((err) => console.log(err));
