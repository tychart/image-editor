export class Image {
    private ppmIn: string
    private ppmArr: string[];
    public width: number;
    public height: number;
    public maxVal: number;
    public pixels: Color[][];


    public constructor() {
        this.ppmIn = "";
        this.ppmArr = [];
        this.width = 0;
        this.height = 0;
        this.maxVal = 0;
        this.pixels = [];
    }

    public parse(ppmIn: string): void {
        this.ppmIn = ppmIn;
        // this.ppmArr = this.ppmIn.split(" ");


        // Remove comments, normalize whitespace, split on any whitespace.
        this.ppmArr = ppmIn
        .replace(/#[^\r\n]*/g, '')  // strip comments (# … end of line)
        .trim()
        .split(/\s+/);              // split on ANY whitespace (space, tab, \r, \n)


        console.log(this.ppmArr);

        this.width = Number(this.ppmArr[1]);
        this.height = Number(this.ppmArr[2]);
        this.maxVal = Number(this.ppmArr[3]);

        for (let x: number = 0; x < this.width; x++) {
            this.pixels.push([])
            for (let y: number = 0; y < this.height; y++) {
                this.pixels[x]!.push(new Color());
            }
        }

        console.log(`Width: ${this.width}, Height: ${this.height}, Max Color Value: ${this.maxVal}`)

        let currIndex: number = 4;

        let y: number;
        let x: number;

        for (y = 0; y < this.height; ++y) {
            for (x = 0; x < this.width; ++x) {
                const currColor = new Color();

                currColor.red = Number(this.ppmArr[currIndex++]);
                currColor.green = Number(this.ppmArr[currIndex++]);
                currColor.blue = Number(this.ppmArr[currIndex++]);

                this.pixels[x]![y] = currColor;
            }
        }

        // console.log(this.pixels.length);
        // console.log(this.pixels[0]!.length);
        
    }

    public exportString(): string {
        let outStr: string = "P3";
        
        outStr = outStr.concat(` ${this.width} ${this.height} ${this.maxVal}`);

        for (let y: number = 0; y < this.height; ++y) {
            for (let x: number = 0; x < this.width; ++x) {
                const currColor = this.pixels[x]![y];

                if (currColor === undefined) {
                    throw new Error(`Invalid pixel at {x=${x}, y=${y}}`)
                }

                outStr = outStr.concat(` ${currColor.red} ${currColor.green} ${currColor.blue}`);
            }
            // console.log(`At y=${y}`)
        }

        return outStr;
    }

    // public distanceFrom(position: Position): { rank: number, file: number } {
    //     return {
    //         rank: Math.abs(position.rank - this.rank),
    //         file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
    //     }
    // }
}

export class Color {
    public red: number;
    public green: number;
    public blue: number;

    public constructor(){
        this.red = 0;
        this.green = 0;
        this.blue = 0;
    }
}