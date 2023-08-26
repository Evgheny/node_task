const {parentPort, workerData} = require("worker_threads");
CalculateService = require('../services/calculate.service');


const canGetNeededValue = async (valueToCalculate) => {
    try {
        console.log('value to calculate', valueToCalculate);
        try {
            if (global.gc) {
                console.log('gc is running');
                global.gc();
            }
        } catch (e) {
            console.log("`node --expose-gc index.js`");
            process.exit();
        }

        let a = 5;
        let b = 7;
        const c = Number(valueToCalculate)

        if (!Number.isInteger(c)) {
            return "Not integer";
        }

        if (a === c || b === c) {
            return "YES";
        }

        const visited = new Set();
        visited.add(a);
        visited.add(b);

        const resultA = await CalculateService.aFlow(visited, a, b, c);

        const resultB = await CalculateService.bFlow(visited, a, b, c);

        if (resultA.bool) {
            return resultA.message;
        } else if (resultB.bool) {
            return resultB.message
        } else {
            return 'NO';
        }
    } catch (error) {
        throw error;
    }
};

(async () => {
    try {
        const result = await canGetNeededValue(workerData.value);
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage({error: error.message || "Unknown error occurred"});
    }
})();