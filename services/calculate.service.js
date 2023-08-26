class CalculateService {
    async processFlow(visited, initialValue, increment, c) {
        let result = {
            bool: false,
            message: 'NO',
        };

        let currentValue = initialValue;

        while (visited.has(currentValue)) {
            console.log((process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(4), 'GB');
            currentValue += increment;
            console.log('Current value:', currentValue);

            if (currentValue === c) {
                result = {
                    bool: true,
                    message: 'YES',
                };
                break;
            } else if (currentValue > c) {
                break;
            }

            visited.add(currentValue);
        }

        return result;
    }

    async aFlow(visited, a, b, c) {
        return this.processFlow(visited, a, b, c);
    }

    async bFlow(visited, a, b, c) {
        return this.processFlow(visited, b, a, c);
    }
}

module.exports = new CalculateService();