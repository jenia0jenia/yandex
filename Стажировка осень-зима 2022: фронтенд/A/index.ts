/**
 * @param {number} N - целое число, количество сотрудников готовых к объединению
 * @param {number[]} staff - массив длины N с грейдами доступных сотрудников
 * @param {number} K - целое число, количество доступных клавиатур
 * @returns {number}
 */

function A(N: number, staff: number[], K: number) {
    let result = 0;
    let count = 0;
    let hashTable = new Array(26).fill(0);

    for (let i = 0; i < staff.length; i++) {
        hashTable[staff[i]]++;
    }

    while (count !== K) {
        let need = K - count;
        let nowCount = hashTable.pop();
        let available = Math.min(need, nowCount);
        result += available * hashTable.length;
        count += available;
    }

    return result;
}

module.exports = A;

// TESTS
// console.log(func(8, [5, 13, 8, 4, 4, 15, 1, 9], 8));
// console.log(func(11, [14, 8, 15, 19, 2, 21, 13, 21, 12, 10, 8], 5));
// console.log(func(15, [19, 20, 5, 10, 2, 20, 7, 9, 1, 3, 13, 14, 3, 3, 4], 1));
// console.log(func(12, [22, 7, 24, 24, 11, 22, 24, 3, 9, 16, 2, 19], 7));
// console.log(func(7, [10, 3, 21, 23, 6, 3, 8], 4));

// let staff = new Uint8Array(1000000000);

// for (let i = 0; i < staff.length; i++) {
//     staff[i] = i % 26;
// }
// console.log(A(1000000000, staff, 1000000000));
