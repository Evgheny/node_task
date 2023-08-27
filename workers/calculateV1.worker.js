const {parentPort, workerData} = require("worker_threads");

class TreeNode {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}

function canReachTargetValue(a, b, c) {
    const root = new TreeNode(a, b);
    const queue = [root];

    while (queue.length > 0) {
        const currentNode = queue.shift();

        if (currentNode.a === c || currentNode.b === c) {
            return "YES";
        }

        const newA = currentNode.a + currentNode.b;
        const newB = currentNode.b + currentNode.a;

        if (newA <= c) {
            const leftChild = new TreeNode(newA, currentNode.b);
            currentNode.left = leftChild;
            queue.push(leftChild);
        }

        if (newB <= c && newB !== newA) {
            const rightChild = new TreeNode(currentNode.a, newB);
            currentNode.right = rightChild;
            queue.push(rightChild);
        }
    }

   return "NO";
}

const a = Number(workerData.a);
const b = Number(workerData.b);
const c = Number(workerData.c);

const result = canReachTargetValue(a,b,c);

(async () => {
    try {
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage({error: error || "Unknown error occurred"});
    }
})();