module.exports = function func(data) {
    // const fs = require("fs");
    // const output = fs.createWriteStream("output.txt");
    let result = "";
    let str = "";
    let bin = "";

    data.sort((a, b) => {
        return a.time - b.time;
    });

    for (let i = 0; i < data.length; i++) {
        if (data[i].value.search(/[0|1]/) >= 0) {
            if (bin.length < data[i].time) {
                bin += Array(data[i].time - bin.length + 1).join(" ");
            }

            bin += data[i].value;
        } else {
            if (str.length < data[i].time) {
                str += Array(data[i].time - str.length + 1).join(" ");
            }

            str += data[i].value;
        }
    }

    for (let i = 0; i < bin.length; i++) {
        if (bin[i] === "1" && str[i]) {
            result += str[i];
            // if (result.length > 100) {
            //     output.write(result);
            //     result = "";
            // }
        }
    }

    // output.write(result);
    return result
};
