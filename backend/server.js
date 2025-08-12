const express = require("express");
require("dotenv").config();
const notesRoute = require("./routes/notes");
const userRoute = require("./routes/user");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
PORT = process.env.PORT;

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Veri tabanına bağlandı⭐️");
    app.listen(PORT, () => {
      console.log(`${PORT} portu dinleniyor🔥`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/notes", notesRoute);
app.use("/api/user", userRoute);
