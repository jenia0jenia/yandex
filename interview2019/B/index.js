const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
});

let result = 0;
let maybeResult = 0;

rl.once("line", () => {
    rl.on("line", (bin) => {
        if (bin === "1") {
            ++maybeResult;

            if (result < maybeResult) {
                result = maybeResult;
            }
        } else {
            maybeResult = 0;
        }
    });
});

rl.on("close", () => {
    process.stdout.write(String(result));
});
