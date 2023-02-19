const readline = require("readline");
const fs = require("fs");
const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");
const rl = readline.createInterface({ input, terminal: false });

const cities = [];

rl.once("line", (line) => {
    rl.on("line", (city) => {
        cities.push(city.split(" "));
    });
});

rl.on("close", () => {
    const [start, end] = cities
        .splice(cities.length - 1)[0]
        .map((el) => el - 1);
    let [maxDist] = cities.splice(cities.length - 1)[0].map((el) => +el);

    output.write(String(findPath(cities, start, end, maxDist)));
});

function isAvailDist(city1, city2, maxDist) {
    return (
        maxDist >= Math.abs(city1[0] - city2[0]) + Math.abs(city1[1] - city2[1])
    );
}

function findPath(cities, start, end, maxDist) {
    if (start === end) {
        return 0;
    }

    const roads = [];

    for (let i = 0; i < cities.length; i++) {
        roads[i] = [];
        for (let j = 0; j < cities.length; j++) {
            if (i !== j && isAvailDist(cities[i], cities[j], maxDist)) {
                roads[i].push(j);
            }
        }
    }

    let queue = [start];
    let pathCount = new Array(roads.length).fill(0);
    cities[start].visited;

    while (queue.length) {
        let from = queue.shift();
        for (let to of roads[from]) {
            if (cities[to].visited) {
                continue;
            }

            pathCount[to] = pathCount[from] + 1;
            cities[to].visited = true;

            if (to === end) {
                return pathCount[to];
            }

            queue.push(to);
        }
    }

    return -1;
}
