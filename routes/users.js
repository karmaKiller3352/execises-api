const express = require('express');
const router = express.Router();
const multer  = require('multer')

const upload = multer()

const addUser = require('../services/addUser');
const addExecise = require('../services/addExecise');
const getUsers = require('../services/getUsers');
const getLogs = require('../services/getLogs');

router.post('/', upload.none(), addUser)
router.get('/', upload.none(), getUsers)
router.get('/:userId/logs', upload.none(), getLogs)
router.post('/:userId/exercises', upload.none(), addExecise)

module.exports = router