const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const schemaValidator = require("../middleware/schemaValidator");
const authentication = require("../middleware/authentication");

const { createUserSchema } = require("./user/schema/input/createUserSchema");
const { userController } = require("../DependencyInjectionContainer");
const router = Router();

router.get("/healthy-check", (_, Response) =>
  Response.status(StatusCodes.OK).send(ReasonPhrases.OK)
);
router.post("/user/create", schemaValidator.body(createUserSchema), (...args) =>
  userController.create(...args)
);
router.post("/user/authenticate", (...args) => userController.authenticate(...args));
router.post("/project/create", authentication, (...args) => userController.authenticate(...args));

module.exports = router;
