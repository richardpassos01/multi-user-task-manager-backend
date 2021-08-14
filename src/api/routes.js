const { Router } = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const router = Router();

router.get('/healthy-check', (_, Response) => Response.status(StatusCodes.OK).send(ReasonPhrases.OK));

module.exports=router;
