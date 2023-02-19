/**
 * @param {string[]} field - описание поля в виде массива строк
 * @param {string} moves - строка со всеми движениями змейки
 * @returns {[number[], number]}
 */

export {};

declare global {
    interface Array<T> {
        recompute(): void;
    }
}

module.exports = B;

function B(field: string[], moves: string): [number[], number] {
    let snake = [
        [0, 2],
        [0, 1],
        [0, 0],
    ];
    const movesArr = moves.split(" ");

    while (movesArr.length > 0) {
        const step = [movesArr.shift(), +movesArr.shift()];
        // console.log(step);
        // console.log(movesArr);

        switch (step[0]) {
            case "U": {
                for (let i = 0; i < step[1]; i++) {
                    if (
                        field[snake[0][0] - 1][snake[0][1]] !== "-" &&
                        field[snake[0][0] - 1][snake[0][1]] !== "o"
                    ) {
                        let delIndex = snake[0][1];
                        let delString = field[snake[0][0] - 1];
                        field[snake[0][0] - 1] =
                            delString.slice(0, delIndex) +
                            "-" +
                            delString.slice(delIndex + 1);
                        snake.unshift([snake[0][0] - 1, snake[0][1]]);
                        continue;
                    } else {
                        snake.recompute();
                        snake[0][0] = snake[0][0] - 1;
                    }
                }
                break;
            }
            case "R": {
                for (let i = 0; i < step[1]; i++) {
                    if (
                        field[snake[0][0]][snake[0][1] + 1] !== "-" &&
                        field[snake[0][0]][snake[0][1] + 1] !== "o"
                    ) {
                        let delIndex = snake[0][1] + 1;
                        let delString = field[snake[0][0]];
                        field[snake[0][0]] =
                            delString.slice(0, delIndex) +
                            "-" +
                            delString.slice(delIndex + 1);
                        snake.unshift([snake[0][0], snake[0][1] + 1]);
                        continue;
                    } else {
                        snake.recompute();
                        snake[0][1] = snake[0][1] + 1;
                    }
                }
                break;
            }
            case "D": {
                for (let i = 0; i < step[1]; i++) {
                    if (
                        field[snake[0][0] + 1][snake[0][1]] !== "-" &&
                        field[snake[0][0] + 1][snake[0][1]] !== "o"
                    ) {
                        let delIndex = snake[0][1];
                        let delString = field[snake[0][0] + 1];

                        field[snake[0][0] + 1] =
                            delString.slice(0, delIndex) +
                            "-" +
                            delString.slice(delIndex + 1);
                        snake.unshift([snake[0][0] + 1, snake[0][1]]);
                        continue;
                    } else {
                        snake.recompute();
                        snake[0][0] = snake[0][0] + 1;
                    }
                }
                break;
            }
            case "L": {
                for (let i = 0; i < step[1]; i++) {
                    if (
                        field[snake[0][0]][snake[0][1] - 1] !== "-" &&
                        field[snake[0][0]][snake[0][1] - 1] !== "o"
                    ) {
                        let delIndex = snake[0][1] - 1;
                        let delString = field[snake[0][0]];
                        field[snake[0][0]] =
                            delString.slice(0, delIndex) +
                            "-" +
                            delString.slice(delIndex + 1);
                        snake.unshift([snake[0][0], snake[0][1] - 1]);
                        continue;
                    } else {
                        snake.recompute();
                        snake[0][1] = snake[0][1] - 1;
                    }
                }
                break;
            }
        }
    }

    console.log(field);

    return [[snake[0][0], snake[0][1]], snake.length];
}

Array.prototype.recompute = function (): void {
    for (let i = 1; i < this.length; i++) {
        this[i][0] = this[i - 1][0];
        this[i][1] = this[i - 1][1];
    }
};

// TESTS

let field = [
    "ooo------Y--AND------",
    "-----EXY--A--N---D--E",
    "-X-----Y--A-N---D----",
    "------EXY----A---N---",
    "--DE--X---------YA---",
    "-----ND---EXY--AN--D-",
    "----E-----X-Y----A--N",
    "D-----E-XY---AN---D--",
    "E--------------------",
    "-------X---Y------A-N",
    "----D-EX----------YA-",
    "--N-DEX--Y-A--N-----D",
    "E------X--Y----------",
];

let moves = "R 12 D 2 R 2 U 1 R 2";
console.log(B(field, moves));

field = [
    "ooo------Y--AND------",
    "-----EXY--A--N---D--E",
    "-X-----Y--A-N---D----",
    "------EXY----A---N---",
    "--DE--X---------YA---",
    "-----ND---EXY--AN--D-",
    "----E-----X-Y----A--N",
    "D-----E-XY---AN---D--",
    "E--------------------",
    "-------X---Y------A-N",
    "----D-EX----------YA-",
    "--N-DEX--Y-A--N-----D",
    "E------X--Y----------",
];
moves = "D 2 L 1 D 2 R 5";
console.log(B(field, moves));
