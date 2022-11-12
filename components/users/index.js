var express = require('express');
var router = express.Router();
const usersController = require('./usersController');
const passport = require("../../passport/index");

router.get("/profile", passport.authenticate("jwt", { session: false }), usersController.profile);

router.post('/register', usersController.register);

router.post("/login", passport.authenticate("local", { session: false }), usersController.login);
module.exports = router;
