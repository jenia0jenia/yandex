interface ITruck {
    targetAfterHours?: number;
    position: number;
    speed: number;
}

interface Data {
    target: number;
    trucks: ITruck[];
}

let data: Data = {
    target: 100,
    trucks: [
        { position: 4, speed: 4 },
        { position: 2, speed: 2 },
        { position: 0, speed: 1 },
    ],
};

function func(data: Data): number {
    let bung: number = 0;

    for (let i = 0; i < data.trucks.length; i++) {
        data.trucks[i].targetAfterHours =
            (data.target - data.trucks[i].position) / data.trucks[i].speed;
    }

    data.trucks.sort((a, b) => {
        return b.targetAfterHours - a.targetAfterHours;
    });

    while (data.trucks.length !== 0) {
        let truck = data.trucks.pop();
        // console.log(truck);

        let DTP: boolean = false
        for (let i = 0; i < data.trucks.length; i++) {
            if (
                truck.position < data.trucks[i].position
            ) {
                DTP = true
                break;
            }
        }

        if (!DTP) {
            bung++;
        }
    }

    return bung;
}

console.log(func(data));

module.exports = func;
