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

    const dict1 = dictFromString(str1);
    const dict2 = dictFromString(str2);

    if (Object.keys(dict1).length !== Object.keys(dict2).length) {
        return 0;
    }

    for (let char in dict1) {
        if (dict1[char] !== dict2[char]) {
            return 0;
        }
    }

    return 1;
}

function dictFromString(str) {
    let dict = {};

    for (let ch of str) {
        dict[ch] = dict[ch] + 1 || 1;
    }

    return dict;
}
