import { CircularBuffer } from './helper/circularBuffer';
export class ROC {
    constructor(period) {
        this.values = new CircularBuffer(period);
    }
    nextValue(value) {
        const outed = this.values.push(value);
        if (outed !== 0) {
            return ((value - outed) / outed) * 100;
        }
    }
    momentValue(value) {
        const outed = this.values.current();
        if (outed !== 0) {
            return ((value - outed) / outed) * 100;
        }
    }
}
