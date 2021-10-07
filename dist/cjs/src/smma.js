"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMMA = void 0;
class SMMA {
    constructor(period) {
        this.period = period;
        this.sum = 0;
        this.avg = 0;
        this.filled = false;
        this.fill = 0;
    }
    nextValue(value) {
        if (this.filled) {
            if (this.avg) {
                this.nextValue = (value) => (this.avg = (this.avg * (this.period - 1) + value) / this.period);
                return this.nextValue(value);
            }
        }
        this.sum += value;
        this.fill++;
        if (this.fill === this.period) {
            this.filled = true;
            this.avg = this.sum / this.period;
            return this.avg;
        }
    }
    momentValue(value) {
        if (!this.filled) {
            return;
        }
        return (this.avg * (this.period - 1) + value) / this.period;
    }
}
exports.SMMA = SMMA;
