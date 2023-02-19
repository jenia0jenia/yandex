function findLatestWeight(weights: number[]) {
    while (weights.length > 1) {
        let max_1_i = 1;
        let max_2_i = 0;

        for (let i = 1; i < weights.length; i++) {
            if (weights[i] >= weights[max_2_i]) {
                max_1_i = max_2_i;
                max_2_i = i;
            } else if (weights[i] > weights[max_1_i]) {
                max_1_i = i;
            }
        }

        if (weights[max_2_i] === weights[max_1_i]) {
            weights.splice(max_2_i, 1);
        } else {
            weights[max_2_i] = weights[max_2_i] - weights[max_1_i];
        }

        weights.splice(max_1_i, 1);
    }

    return weights[0] || 0;
}

module.exports = findLatestWeight;

let weights = [2, 7, 4, 1, 8, 1];
console.log(findLatestWeight(weights));

weights = [1];
console.log(findLatestWeight(weights));

weights = [1, 10];
console.log(findLatestWeight(weights));

weights = [1, 1];
console.log(findLatestWeight(weights));

weights = [1, 2];
console.log(findLatestWeight(weights));

weights = [1, 9, 0, 1, 12, 0, 11, 11, 12, 12];
console.log(findLatestWeight(weights));
