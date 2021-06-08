const oboe = require("oboe");
const fs = require("fs");
const { stdout } = require("process");
const path = require("path");

if (process.argv.length < 3) {
  console.error("usage : node index.js [meshroomFile].json");
  process.exit(1);
}

const FILENAME = path.normalize(process.argv[2]);
const DESTFILE = path.join(
  path.dirname(FILENAME),
  path.basename(FILENAME, ".json") + ".pts"
);
const TMPDESTFILE = DESTFILE + ".tmp";

// Parse files

let tmpFileStream = fs.createWriteStream(TMPDESTFILE);
let pointCounter = 0;

console.info(`Parsing ${FILENAME} to ${DESTFILE}`);

updateLog();
oboe(fs.createReadStream(FILENAME, "utf8"))
  .node("{X color}", function (el) {
    pointCounter += 1;

    tmpFileStream.write(
      `${el.X[0]} ${el.X[1]} ${el.X[2]} 128 ${el.color[0]} ${el.color[1]} ${el.color[2]}\n`
    );

    updateLog();
    return oboe.drop;
  })
  .done(() => {
    tmpFileStream.close();
    console.info("");
    finalizeFile();
  });

function updateLog() {
  stdout.write(`\rParsing points... ${pointCounter}`);
}

// Build final file

function finalizeFile() {
  console.info("Building final file...");

  let finalFile = fs.createWriteStream(DESTFILE);
  let tmpFileRead = fs.createReadStream(TMPDESTFILE);

  finalFile.write(`${pointCounter}\n`);
  tmpFileRead.pipe(finalFile);
  tmpFileStream.on("end", () => console.info("Finished"));
}
