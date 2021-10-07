import { SMMA } from '../smma';
export class AvgChangeProvider {
    constructor(period) {
        this.avgGain = new SMMA(period);
        this.avgLoss = new SMMA(period);
        this.prev = 0;
    }
    nextValue(value) {
        const change = value - this.prev;
        if (!this.prev) {
            this.prev = value;
            return;
        }
        const isPositive = change > 0;
        const isNegative = change < 0;
        const localGain = isPositive ? change : 0;
        const localLoss = isNegative ? change : 0;
        const upAvg = this.avgGain.nextValue(localGain);
        const downAvg = this.avgLoss.nextValue(localLoss);
        this.prev = value;
        return { upAvg, downAvg };
    }
    momentValue(value) {
        const change = value - this.prev;
        const isPositive = change > 0;
        const isNegative = change < 0;
        const localGain = isPositive ? change : 0;
        const localLoss = isNegative ? change : 0;
        const upAvg = this.avgGain.momentValue(localGain);
        const downAvg = this.avgLoss.momentValue(localLoss);
        return { upAvg, downAvg };
    }
}
