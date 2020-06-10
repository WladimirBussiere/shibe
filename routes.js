'use strict'

const express = require('express');
const animals = require("./controllers/animalsController.js");
const utils = require('./utils.js')

let router = express.Router();

router.get('/:animal', utils.checkQueryParams, animals.getAnimals);


module.exports = router;
