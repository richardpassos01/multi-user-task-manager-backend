const supertest = require("supertest");
const { database } = require("../../../../src/DependencyInjectionContainer");
const app = require("../../../../src/api/app");
const server = require("../../../../src/api/server");
const UserFactory = require("../../../factories/UserFactory");
const ProjectFactory = require("../../../factories/ProjectFactory");

const request = supertest(app);
const { StatusCodes } = require("http-status-codes");

let authentication;
let user;

describe("projectAPI", () => {
  beforeAll(async () => {
    await database.connection().migrate.latest();
    user = new UserFactory();
    authentication = await user.saveAndAuthenticate();
  });

  afterAll(async () => {
    await database.connection().migrate.rollback();
    server.close();
  });

  describe("listProjects", () => {
    describe("When called the endpoint", () => {
      test("then return user's projects", async () => {
        const userId = user.get().id;
        const project = await new ProjectFactory("project", userId).getAndSave();
        request
          .get("/task-manager/projects")
          .set("Authorization", "bearer " + authentication.access_token)
          .expect(StatusCodes.OK)
          .end(async (err, response) => {
            [{ name: projectName }] = response.body;
            expect(projectName).toEqual(project.name);
          });
      });
    });
  });

  describe("createProject", () => {
    describe("When called the endpoint with payload", () => {
      test("then create the project", async () => {
        request
          .post("/task-manager/project")
          .set("Authorization", "bearer " + authentication.access_token)
          .send({
            name: "project",
          })
          .expect(StatusCodes.CREATED)
          .end(async (err) => {
            expect(err).toBeFalsy();
          });
      });

      describe("When called the endpoint without payload", () => {
        test("then throw bad request error", async () => {
          request
            .post("/task-manager/project")
            .set("Authorization", "bearer " + authentication.access_token)
            .expect(StatusCodes.BAD_REQUEST);
        });
      });
    });
  });

  describe("updateProject", () => {
    describe("When called the endpoint with payload", () => {
      test("then update the project", async () => {
        const userId = user.get().id;
        const project = await new ProjectFactory("project", userId).getAndSave();
        request
          .put(`/task-manager/project/${project.id}`)
          .set("Authorization", "bearer " + authentication.access_token)
          .send({
            name: "project",
          })
          .expect(StatusCodes.NO_CONTENT)
          .end(async (err) => {
            expect(err).toBeFalsy();
          });
      });
    });

    describe("When called the endpoint without payload", () => {
      test("then throw bad request error", async () => {
        const userId = user.get().id;
        const project = await new ProjectFactory("project", userId).getAndSave();

        request
          .put(`/task-manager/project/${project.id}`)
          .set("Authorization", "bearer " + authentication.access_token)
          .expect(StatusCodes.BAD_REQUEST);
      });
    });
  });

  describe("deleteProject", () => {
    describe("When called the endpoint", () => {
      test("then delete the project", async () => {
        const userId = user.get().id;
        const project = await new ProjectFactory("project", userId).getAndSave();
        request
          .delete(`/task-manager/project/${project.id}`)
          .set("Authorization", "bearer " + authentication.access_token)
          .expect(StatusCodes.NO_CONTENT)
          .end(async (err) => {
            expect(err).toBeFalsy();
          });
      });
    });
  });
});
