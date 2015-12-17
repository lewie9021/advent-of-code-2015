var Path = require("path");
var FS = require("fs-extra");
        
var name = process.argv[2];
var output = Path.join(__dirname, "src", name);

console.log("Creating", output);
FS.copySync(Path.join(__dirname, "boilerplate"), output);

console.log("Operation successful.");
