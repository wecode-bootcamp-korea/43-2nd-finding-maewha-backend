const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const { globalErrorHandler } = require("./utils/error");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined"));
  app.use(routes);

  app.use(globalErrorHandler);

  return app;
};

//https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=2acd083400a6093e68c4b82d5b090002&redirect_uri=http://localhost:3001/oauth/kakao

module.exports = { createApp };
