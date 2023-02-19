interface IBemResult {
    mod: string;
    elem: string;
}

function bem(str: string): IBemResult | any {
    let mod;
    let elem;
    let delimeters = str.match(/[^a-z]{1,}/g);
    if (delimeters.length === 2) {
        [mod, elem] = delimeters;
    } else {
        [mod, elem] = new Set(delimeters);

        let getDelimeterCount = (delimeter) =>
            delimeters.reduce(
                (count, del) => (delimeter === del ? count + 1 : count),
                0
            );

        if (getDelimeterCount(mod) < getDelimeterCount(elem)) {
            [mod, elem] = [elem, mod];
        }
    }

    return {
        mod,
        elem,
    };
}

module.exports = bem;

let str;

str = "block__mod__val—elem";
console.log(bem(str));

str = "block–mod–val___elem";
console.log(bem(str));

str = "block_mod__elem";
console.log(bem(str));

str = "block_mod_mod__elem";
console.log(bem(str));

str = "block__elem_mod_mod";
console.log(bem(str));

str = "block_mod_mod";
console.log(bem(str));

str = "black%%__elem_mod_mod";
console.log(bem(str));
