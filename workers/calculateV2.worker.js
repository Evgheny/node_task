const {parentPort, workerData} = require("worker_threads");

    const a = Number(workerData.value.a);
    const b = Number(workerData.value.b);
    const c = Number(workerData.value.c);

    let result = 'We can`t reach this number';

    function canReachTarget(target, currentA, currentB) {
        if (currentA === target || currentB === target) {
            return true;
        }
        if (currentA > target || currentB > target) {
            return false;
        }
        return canReachTarget(target, currentA + currentB, currentB) || canReachTarget(target, currentA, currentB + currentA);
    }

    if (canReachTarget(c, a, b)) {
        result = 'Yes! we can rich this number'
    }

(async () => {
    try {
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage({error: error || "Unknown error occurred"});
    }
})();