var Path = require("path");
var FS = require("fs-extra");
        
var name = process.argv[2];
var root = Path.join(__dirname, "..");
var output = Path.join(root, "src", name);

console.log("Creating", output);
FS.copySync(Path.join(root, "boilerplate"), output);

console.log("Operation successful.");
