require("dotenv").config();
const request = require("supertest");
const { createApp } = require("./app");
const { appDataSource } = require("./models/data-source");

describe("Sign In", () => {
  let app;
  let cookies;
  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  test("FAILED: invalid token", async () => {
    cookies = "1234";
    await request(app)
      .post("/users/kakao")
      .set("authorization", cookies)
      .expect(400)
      .expect({ message: "KAKAO_TOKEN_ERROR" });
  });

  test("SUCCESS: valid user", async () => {
    cookies = process.env.TEST_KAKAO_TOKEN;
    await request(app)
      .post("/users/kakao")
      .set("authorization", cookies)
      .expect(200);
  });
});
