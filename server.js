const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const LOCAL_DB_URL = 'mongodb://localhost/Dashboard';
// mongodb+srv://vishakh:<password>@cluster0.cmybp.mongodb.net/test
const DB_URL = process.env.DB_URL;

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

app.use(express.json());
const userRouter = require("./routes/users.js");
app.use("/", userRouter);
app.use("/", (req, res) => res.send("Backend is working"));

const SERVER_PORT = 9000;
app.listen(process.env.PORT || SERVER_PORT, () =>
  console.log("Server is running on port:", SERVER_PORT)
);
