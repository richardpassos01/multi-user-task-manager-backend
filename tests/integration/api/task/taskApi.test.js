const supertest = require("supertest");
const { database } = require("../../../../src/DependencyInjectionContainer");
const app = require("../../../../src/api/app");
const server = require("../../../../src/api/server");
const UserFactory = require("../../../factories/UserFactory");
const ProjectFactory = require("../../../factories/ProjectFactory");
const TaskFactory = require("../../../factories/TaskFactory");
const {
  database: { tables },
} = require("../../../../src/config");
const { taskRepository } = require("../../../../src/DependencyInjectionContainer");

const request = supertest(app);
const { StatusCodes } = require("http-status-codes");

let authentication;
let user;
let userId;
let project;

describe("taskAPI", () => {
  beforeAll(async () => {
    await database.connection().migrate.latest();
    user = new UserFactory();
    authentication = await user.saveAndAuthenticate();
    userId = user.get().id;
    project = await new ProjectFactory("project", userId).getAndSave();
  });

  afterAll(async () => {
    await database.connection().migrate.rollback();
    await database.connection().destroy();
    server.close();
  });

  describe("createTask", () => {
    describe("When called the endpoint with payload", () => {
      test("then create the task", async () => {
        request
          .post(`/task-manager/task/${project.id}`)
          .set("Authorization", "bearer " + authentication.access_token)
          .send({
            description: "my new todo",
          })
          .expect(StatusCodes.CREATED)
          .end(async (err) => {
            const [data] = await database
              .connection()
              .select("id")
              .where("description", "my new todo")
              .into(tables.tasks);

            expect(!!data.id).toBeTruthy();
          });
      });

      describe("When called the endpoint without payload", () => {
        test("then throw bad request error", async () => {
          request
            .post(`/task-manager/task/${project.id}`)
            .set("Authorization", "bearer " + authentication.access_token)
            .expect(StatusCodes.BAD_REQUEST);
        });
      });
    });
  });

  describe("deleteTask", () => {
    describe("When called the endpoint", () => {
      test("then delete the task", async () => {
        const task = await new TaskFactory("todo", project.id).getAndSave();

        request
          .delete(`/task-manager/task/${project.id}/${task.id}`)
          .set("Authorization", "bearer " + authentication.access_token)
          .expect(StatusCodes.NO_CONTENT)
          .end(async (err) => {
            const [data] = await database
              .connection()
              .select("*")
              .where("id", task.id)
              .into(tables.tasks);

            expect(!!data).toBeFalsy();
          });
      });
    });

    describe("When called the endpoint with task completed", () => {
      test("then don't delete the task", async () => {
        const task = await new TaskFactory("task", project.id).getAndSave();
        await taskRepository.complete(task.id, project.id);

        request
          .delete(`/task-manager/task/${project.id}/${task.id}`)
          .set("Authorization", "bearer " + authentication.access_token)
          .expect(StatusCodes.NO_CONTENT)
          .end(async (err) => {
            const [data] = await database
              .connection()
              .select("description")
              .where("id", task.id)
              .into(tables.tasks);

            expect(!!data.description).toBeTruthy();
          });
      });
    });
  });

  describe("updateTaskDescription", () => {
    describe("When called the endpoint with payload", () => {
      test("then update the task description", async () => {
        const task = await new TaskFactory("todo", project.id).getAndSave();

        request
          .patch(`/task-manager/task/${project.id}/${task.id}/update-description`)
          .set("Authorization", "bearer " + authentication.access_token)
          .send({
            description: "new description",
          })
          .expect(StatusCodes.NO_CONTENT)
          .end(async (err) => {
            await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, 500)
            );
          });
      });
    });

    describe("When called the endpoint without payload", () => {
      test("then throw bad request error", async () => {
        const task = await new TaskFactory("todo", project.id).getAndSave();

        request
          .patch(`/task-manager/task/${project.id}/${task.id}/update-description`)
          .set("Authorization", "bearer " + authentication.access_token)
          .expect(StatusCodes.BAD_REQUEST);
      });
    });

    describe("When called the endpoint with task completed", () => {
      test("then don't update the task", async () => {
        const task = await new TaskFactory("no updated", project.id).getAndSave();
        await taskRepository.complete(task.id, project.id);

        request
          .patch(`/task-manager/task/${project.id}/${task.id}/update-description`)
          .set("Authorization", "bearer " + authentication.access_token)
          .send({
            description: "updated",
          })
          .expect(StatusCodes.NO_CONTENT)
          .end(async (err) => {
            const [data] = await database
              .connection()
              .select("description")
              .where("id", task.id)
              .into(tables.tasks);

            expect(data.description).toEqual("no updated");
          });
      });
    });
  });

  describe("completeTask", () => {
    describe("When called the endpoint", () => {
      test("then update the completed date of the task", async () => {
        const task = await new TaskFactory("todo", project.id).getAndSave();

        request
          .patch(`/task-manager/task/${project.id}/${task.id}/complete`)
          .set("Authorization", "bearer " + authentication.access_token)
          .expect(StatusCodes.NO_CONTENT)
          .end(async (err) => {
            const [data] = await database
              .connection()
              .select("completed_at")
              .where("id", task.id)
              .into(tables.tasks);

            expect(!!data.completed_at).toBeTruthy();
          });
      });
    });
  });
});
