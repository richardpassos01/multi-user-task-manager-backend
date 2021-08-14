const supertest = require("supertest");
const { database } = require("../../../../src/DependencyInjectionContainer");
const app = require("../../../../src/api/app");
const server = require("../../../../src/api/server");

const request = supertest(app);
const { StatusCodes } = require("http-status-codes");

describe("createUser", () => {

  beforeAll(async () => {
    await database.connection().migrate.latest();
  });

  afterAll(async () => {
    await database.connection().migrate.rollback();
    server.close();
  });

  describe("When called api with name, email and password", () => {
    test("then create user", async () => {
      request
        .post("/task-manager/user/create")
        .send({
          name: "richard",
          email: "richard@email.com",
          password: "myPass",
        })
        .expect(StatusCodes.CREATED)
        .end(async (err) => {
          expect(err).toBeFalsy();
        });
    });
  });

  describe("When called api without name, email or password", () => {
    test("then throw bad request error", async () => {
      request
        .post("/task-manager/user/create")
        .send({
          name: "richard",
          email: "richard@email.com",
        })
        .expect(StatusCodes.BAD_REQUEST)
    });
  });
});
