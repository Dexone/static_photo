const sharp = require("sharp");
const fs = require("fs");
const path = require("node:path");

const testFolder = "../static_photo/";

fs.readdir(testFolder, (err, files) => {
  files.forEach((file) => {
    const stat = fs.lstatSync(file);
    if (stat.isDirectory()) {
      fs.readdir(file, (err, files2) => {
        files2.forEach((file2) => {
          const stat2 = fs.lstatSync(path.join(file + "/" + file2));
          if (stat2.isFile() && file2.endsWith(".png")) {
            const name = file2
              .split("")
              .splice(file2.length - 5, file2.length - 4)
              .join("");

            fs.mkdir(path.join("webp" + "/" + file), (err) => {
              if (err) {
                return console.error(err);
              }
              console.log("Directory created successfully!");
            });

            sharp(path.join(file + "/" + file2)).toFile(
              "webp" + "/" + file + "/" + name + ".webp",
              (err, info) => {
                if (!err) {
                  console.log(info);
                } else {
                  console.log(err);
                }
              }
            );
          }
        });
      });
    }
  });
});
