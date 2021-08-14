const { Router } = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const schemaValidator = require ('../middleware/schemaValidator');

const { createUserSchema } = require('./user/schema/input/createUserSchema');
const { userController } = require('../DependencyInjectionContainer');
const router = Router();

router.get('/healthy-check', (_, Response) => Response.status(StatusCodes.OK).send(ReasonPhrases.OK));
router.post('/user/create', schemaValidator.body(createUserSchema),
    (...args) => userController.create(...args).then());


module.exports=router;
