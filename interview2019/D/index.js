const readline = require("readline");
const fs = require("fs");
const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");
const rl = readline.createInterface({ input, terminal: false });

let result = "";

rl.once("line", (n) => {
    n = +n;

    gen(n, 0, 0, "");
    
    output.end(result);

    function gen(n, open = 0, close = 0, str) {
        if (open + close === 2 * n) {
            result += str + "\n";

            if (result.length > 100) {
                output.write(result);
                result = "";
            }

            return;
        }

        if (open < n) {
            gen(n, open + 1, close, str + "(");
        }

        if (open > close) {
            gen(n, open, close + 1, str + ")");
        }
    }
});