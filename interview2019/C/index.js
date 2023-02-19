const readline = require("readline");
const fs = require("fs");
const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");
const rl = readline.createInterface({ input, terminal: false });

let result = "";

rl.once("line", () => {
    let lastNumber;

    rl.on("line", (number) => {
        if (number !== lastNumber) {
            result += `${number}\n`;
            lastNumber = number;
        }

        if (result.length > 100) {
            output.write(`${result}\n`);
            result = "";
        }
    });

    rl.on("close", () => {
        output.end(`${result}`);
    });
});
