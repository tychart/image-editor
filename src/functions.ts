import { Image, Color } from "./image";

export function grayscale(image: Image): void {

    if (!image.pixels) {
        throw new Error("Invalid image structure");
    }


    for (let x: number = 0; x < image.width; ++x) {
        
        
        const column: Color[] | undefined = image.pixels[x];
        if (column === undefined) {
            throw new Error(`Invalid pixel column at x=${x}`);
        }

        
        for (let y: number = 0; y < image.height; ++y) {

            // console.log(x)

            let currColor: Color | undefined = column[y];
            if (currColor === undefined) {
                throw new Error(`Invalid pixel at {x=${x}, y=${y}}`)
            }

            let grayLevel: number = Math.floor((currColor.red + currColor.green + currColor.blue) / 3);

            grayLevel = Math.max(0, Math.min(grayLevel, image.maxVal));

            currColor.red = grayLevel;
            currColor.green = grayLevel;
            currColor.blue = grayLevel;

        }
    }
}

export function invert(image: Image): void {
    for (let x: number = 0; x < image.width; ++x) {
        for (let y: number = 0; y < image.height; ++y) {
            const currColor = image.pixels[x]![y]

            if (currColor === undefined) {
                throw new Error(`Invalid pixel at {x=${x}, y=${y}}`)
            }

            currColor.red = image.maxVal - currColor.red;
            currColor.green = image.maxVal - currColor.green;
            currColor.blue = image.maxVal - currColor.blue;
        }
    }
}

export function emboss(image: Image): void {
    for (let x: number = image.width - 1; x >= 0; --x) {
        for (let y: number = image.height - 1; y >= 0; --y) {
            const currColor = image.pixels[x]![y];

            if (currColor === undefined) {
                throw new Error(`Invalid pixel at {x=${x}, y=${y}}`)
            }

            let diff: number = 0;

            if (x > 0 && y > 0) {
                let upLeftColor: Color | undefined = image.pixels[x - 1]![y - 1];

                if (upLeftColor === undefined) {
                    throw new Error(`Invalid pixel at {x=${x}, y=${y}}`)
                }

                if (Math.abs(currColor.red - upLeftColor.red) > Math.abs(diff)) {
                    diff = currColor.red - upLeftColor.red;
                }
                if (Math.abs(currColor.green - upLeftColor.green) > Math.abs(diff)) {
                    diff = currColor.green - upLeftColor.green;
                }
                if (Math.abs(currColor.blue - upLeftColor.blue) > Math.abs(diff)) {
                    diff = currColor.blue - upLeftColor.blue;
                }


            }

            let grayLevel: number = (128 + diff);
            grayLevel = Math.max(0, Math.min(grayLevel, image.maxVal));

            currColor.red = grayLevel;
            currColor.green = grayLevel;
            currColor.blue = grayLevel;

        }
    }


}