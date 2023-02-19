const readline = require("readline");
const fs = require("fs");
const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");
const rl = readline.createInterface({ input, terminal: false });

rl.once("line", (str1) => {
    rl.once("line", (str2) => {
        output.write(String(isAnagram(str1, str2)));
    });
});

function isAnagram(str1, str2) {
    if (str1.length !== str2.length) {
        return 0;
    }

    let res1 = res2 = 0

    // https://habr.com/ru/company/vdsina/blog/538298/
    for (let i = 0; i < str1.length; i++) {
        res1 ^= str1[i];
        res2 ^= str2[i];
    }

    return res1 === res2 ? 1 : 0;
}