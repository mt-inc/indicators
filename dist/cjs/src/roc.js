"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROC = void 0;
const circularBuffer_1 = require("./helper/circularBuffer");
class ROC {
    constructor(period) {
        this.values = new circularBuffer_1.CircularBuffer(period);
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
exports.ROC = ROC;
