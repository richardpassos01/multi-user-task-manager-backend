const ListProjectsAndTasks = require("../../../../src/application/use_cases/ListProjectsAndTasks");

let listProjectsAndTasks;
let projectRepository = {
  findByUserId: jest.fn(),
};
let taskRepository = {
  findByProjectIds: jest.fn(),
};

describe("ListProjectsAndTasks", () => {
  describe("When execute", () => {
    describe("and the user has no projects", () => {
      beforeAll(async () => {
        projectRepository.findByUserId = jest.fn().mockReturnValue([]);
        listProjectsAndTasks = new ListProjectsAndTasks(projectRepository, taskRepository);
      });

      test("then return a empty array", async () => {
        const result = await listProjectsAndTasks.execute("123");

        expect(result).toEqual([]);
      });
    });

    describe("and the user has projects and has no tasks", () => {
      beforeAll(async () => {
        projectRepository.findByUserId = jest.fn().mockReturnValue([{ project: 1 }]);
        taskRepository.findByProjectIds = jest.fn().mockReturnValue([]);
        listProjectsAndTasks = new ListProjectsAndTasks(projectRepository, taskRepository);
      });

      test("then return projects", async () => {
        const result = await listProjectsAndTasks.execute("123");
        expect(result).toEqual([{ project: 1 }]);
      });
    });

    describe("and the user has projects and tasks", () => {
      beforeAll(async () => {
        projectRepository.findByUserId = jest.fn().mockReturnValue([{ id: 1 }, { id: 2 }]);
        taskRepository.findByProjectIds = jest.fn().mockReturnValue([
          {
            projectId: 1,
            description: "task",
          },
          {
            projectId: 1,
            description: "task 2",
          },
          {
            projectId: 2,
            description: "task",
          },
        ]);
        listProjectsAndTasks = new ListProjectsAndTasks(projectRepository, taskRepository);
      });

      test("then return projects", async () => {
        const result = await listProjectsAndTasks.execute("123");

        const expectedResult = [
          {
            id: 1,
            tasks: [
              {
                projectId: 1,
                description: "task",
              },
              {
                projectId: 1,
                description: "task 2",
              },
            ],
          },
          {
            id: 2,
            tasks: [
              {
                projectId: 2,
                description: "task",
              },
            ],
          },
        ];
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
