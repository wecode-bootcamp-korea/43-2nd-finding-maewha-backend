require("dotenv").config();

const { createApp } = require("./app");
const { appDataSource } = require("./models/data-source.js");

const start = async () => {
  const app = createApp();
  const PORT = process.env.PORT;
  try {
    await appDataSource.initialize();
    console.log("DB Connection");
    app.get("/ping", (req, res) => {
      res.status(200).json({ message: "pong" });
    });
    app.listen(PORT, () =>
      console.log(`🥥🥥Server is listening on ${PORT}🥥🥥`)
    );
  } catch (err) {
    console.error(err);
  }
};

start();
