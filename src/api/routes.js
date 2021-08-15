const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const schemaValidator = require("../middleware/schemaValidator");
const authentication = require("../middleware/authentication");

const {
  createUserSchema,
  authenticateUserSchema,
} = require("./user/schema/input/createUserSchema");
const { projectInputSchema } = require("./project/schema/input/projectInputSchema");
const { taskInputSchema } = require("./task/schema/input/taskInputSchema");

const {
  userController,
  projectController,
  taskController,
} = require("../DependencyInjectionContainer");

const router = Router();

router.get("/healthy-check", (_, Response) =>
  Response.status(StatusCodes.OK).send(ReasonPhrases.OK)
);

router.post("/user", schemaValidator.body(createUserSchema), (...args) =>
  userController.create(...args)
);
router.post("/user/authenticate", schemaValidator.body(authenticateUserSchema), (...args) =>
  userController.authenticate(...args)
);

router.get("/projects", authentication, (...args) => projectController.list(...args));
router.post("/project", authentication, schemaValidator.body(projectInputSchema), (...args) =>
  projectController.create(...args)
);
router.put("/project/:id", authentication, schemaValidator.body(projectInputSchema), (...args) =>
  projectController.update(...args)
);
router.delete("/project/:id", authentication, (...args) => projectController.remove(...args));

router.post("/task/:projectId", schemaValidator.body(taskInputSchema), authentication, (...args) =>
  taskController.create(...args)
);
router.delete("/task/:projectId/:id", authentication, (...args) => taskController.remove(...args));
router.patch(
  "/task/:projectId/:id/update-description",
  schemaValidator.body(taskInputSchema),
  authentication,
  (...args) => taskController.update(...args)
);
router.patch("/task/:projectId/:id/complete", authentication, (...args) =>
  taskController.complete(...args)
);

module.exports = router;
