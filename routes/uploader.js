var buffer = require('buffer');
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET uploader page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST image to store it in db */
router.post('/', function(req, res, next) {

    const buf = Buffer.from(req.body.src, 'base64');

    const ext = req.body.src.split(';')[0].split('/')[1];

    const filename = Date.now() + '.' + ext;

    fs.writeFile(path.join(__dirname, '../public/images/', filename), buf, function(error){
        if (error){
            throw error;
        } else {
            res.json({
                src: req.body.src
            });
        }
    });

});

module.exports = router;
