var express = require('express');
const { PrismaClient } = require('@prisma/client');

var router = express.Router();
const prisma = new PrismaClient();

const app = express();

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
