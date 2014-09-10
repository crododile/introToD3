var fs = require('fs');
var dataPath = "./public/data.txt";
fs.readFile( dataPath, "utf8", function (err, data) {
	data = data.replace(/\s\((\D*)\)\s/g, '\t$1\t');
  fs.writeFile("./studios.txt", data);
});