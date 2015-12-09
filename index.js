import FS from "fs";
import Path from "path";

const srcPath = Path.join(__dirname, "src");

FS.readdirSync(srcPath)
    .sort()
    .map((name) => Path.join(srcPath, name))
    .map((modulePath) => require(modulePath))
    .forEach((module) => {
        console.log(`------ ${module.title} ------`);
        module.run();
        console.log("");
    });
