const cities = [
    "Геленджик",
    "Домодедово",
    "Казань",
    "Люберцы",
    "Нижний Новгород",
    "Орёл",
    "Санкт-Петербург",
];

function func(cities) {
    let rightCities = [];

    let cur = 0;
    while (cities.length !== rightCities.length) {
        rightCities = [cities[cur]];
        let currentCity = cities[cur];

        for (let j = 0; j < cities.length; j++) {
            let finded = false;

            for (let i = 0; i < cities.length; i++) {
                if (cur === i) {
                    continue;
                }

                let nextCity = cities[i];

                if (rightCities.includes(nextCity)) {
                    continue;
                }

                let lastLetter = currentCity[currentCity.length - 1];

                if (lastLetter === "ъ" || lastLetter === "ь") {
                    lastLetter = currentCity[currentCity.length - 2];
                }

                if (nextCity[0].toLowerCase() === lastLetter) {
                    rightCities.push(nextCity);
                    currentCity = nextCity;
                    finded = true;
                    break;
                }
            }

            if (!finded) {
                break;
            }
        }

        cur++;
    }
    return rightCities;
}

console.log(func(cities));

module.exports = func;
