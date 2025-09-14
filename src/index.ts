import * as fs from "node:fs";

import { emboss, grayscale, invert, motionblur } from "./functions";
import { Image, Color } from "./image";

console.log("Program Input Validation!");

const [arg1 , arg2, inPath, outPath, op, motionblurLength ] = process.argv;
if (!inPath || !outPath || !op) {
  console.error("USAGE: node dist/index.js <in-file> <out-file> <grayscale|invert|emboss|motionblur> [motion-blur-length]");
  process.exit(1);
} else {
    console.log(`Arg1: '${arg1}', Arg2: '${arg1}'`)
    console.log(`In Path '${inPath}', Out Path '${outPath}', Options '${op}'`)
}

console.log("Program Start")


// Read file as string
const ppmIn = fs.readFileSync(inPath, "utf-8");
let ppmOut: string = ""

// console.log(ppmIn)

const image: Image = new Image()
image.parse(ppmIn);

switch(op) {
    case "grayscale": {
        console.log("Doing Grayscale")
        grayscale(image)
        console.log("Finished Grayscale")
        break;
    }
    case "invert": {
        console.log("Doing Invert")
        invert(image)
        console.log("Finished Invert")
        break;
    }
    case "emboss": {
        console.log("Doing Emboss")
        emboss(image);
        console.log("Finished Emboss")
        break;
    }
    case "motionblur": {
        console.log("Doing Motionblur")
        motionblur(image, Number(motionblurLength))
        console.log("Finished Motionblur")
        break;
    }
    default: {
        console.error(`Error: Input '${op} not reconized, please use one of the supported options grayscale|invert|emboss|motionblur`)
        process.exit(1);
    }
}


// console.log(image.exportString());

// Write file
fs.writeFileSync(outPath, image.exportString());
