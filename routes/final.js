var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataPath = "./public/data.txt";

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('final',{ title: "Graph" })
});

router.get('/bo', function(req, res){
  fs.readFile( dataPath, "utf8", function (err, data) {
	  console.log(err);
      console.log(data);
	  res.write(data);
	  res.send();
  });
})

module.exports = router;