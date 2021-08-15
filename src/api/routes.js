const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const schemaValidator = require("../middleware/schemaValidator");
const authentication = require("../middleware/authentication");

const {
  createUserSchema,
  authenticateUserSchema,
} = require("./user/schema/input/createUserSchema");
const { projectInputSchema } = require("./project/schema/input/projectInputSchema");

const { userController, projectController } = require("../DependencyInjectionContainer");

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

module.exports = router;
