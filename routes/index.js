var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

    fs.readFile('bin/config', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
  res.render('index', { title: 'Express' });
});

module.exports = router;
