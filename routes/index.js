var express = require('express');
var router = express.Router();
var fs = require('fs');
var gpio = require('pi-gpio')

function isAuthentificated(req, res, next){
    fs.readFile('bin/config', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        if (req.session.pwd && req.session.pwd == data){
            next();
        }else{
            res.render('login', { title: 'Door Control' });
        }
    });

}

function pause() {
    setTimeout(closePins, 1000);
}

function closePins() {
    gpio.destroy(function() {
        console.log('All operating is finish');
    });
}

/* GET home page. */
router.post('/',function(req, res, next) {

    req.session.pwd =

    res.render('index', { title: 'Door Control' });
});

/* GET home page. */
router.get('/',isAuthentificated,function(req, res, next) {

  res.render('index', { title: 'Door Control' });
});

/* GET api door 1. */
router.get('/api/door1',isAuthentificated, function(req, res, next) {

    gpio.setup(2, gpio.DIR_OUT, pause);
    res.render('index', { title: 'Door Control' });
});

/* GET api door 2. */
router.get('/api/door2',isAuthentificated, function(req, res, next) {

    gpio.setup(3, gpio.DIR_OUT, pause);
    res.render('index', { title: 'Door Control' });
});

/* GET api portal. */
router.get('/api/portal',isAuthentificated, function(req, res, next) {

    gpio.setup(4, gpio.DIR_OUT, pause);
    res.render('index', { title: 'Door Control' });
});

/* GET api portal + door 1. */
router.get('/api/portal&door1',isAuthentificated, function(req, res, next) {
    gpio.setup(2, gpio.DIR_OUT);
    gpio.setup(4, gpio.DIR_OUT, pause);
    res.render('index', { title: 'Door Control' });
});

/* GET api portal + door 2. */
router.get('/api/portal&door2',isAuthentificated, function(req, res, next) {
    gpio.setup(3, gpio.DIR_OUT);
    gpio.setup(4, gpio.DIR_OUT, pause);
    res.render('index', { title: 'Door Control' });
});


module.exports = router;
