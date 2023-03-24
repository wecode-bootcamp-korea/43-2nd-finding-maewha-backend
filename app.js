require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { appDataSource } = require("./models/data-source");
const { globalErrorHandler } = require("./utils/error");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(globalErrorHandler);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    await appDataSource.initialize().then(() => console.log("DB Connection"));

    app.listen(PORT, () =>
      console.log(`🥥🥥Server is listening on ${PORT}🥥🥥`)
    );
  } catch (err) {
    console.error(err);
  }
};

start();
