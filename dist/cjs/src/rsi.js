"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSI = void 0;
const gain_1 = require("./helper/gain");
const utils_1 = require("@mt-inc/utils");
class RSI {
    constructor(period = 14) {
        this.period = period;
        this.change = new gain_1.AvgChangeProvider(this.period);
        this.hist = [];
    }
    nextValue(value) {
        const { downAvg, upAvg } = this.change.nextValue(value) || {};
        if (upAvg === undefined || downAvg === undefined) {
            return;
        }
        const RS = upAvg / -downAvg;
        this.rsi = 100 - 100 / (1 + RS);
        if (this.hist.length >= utils_1.saveHistory) {
            this.hist.shift();
        }
        this.hist.push(this.rsi);
        return this.rsi;
    }
    momentValue(value) {
        const { downAvg, upAvg } = this.change.momentValue(value) || {};
        if (upAvg === undefined || downAvg === undefined) {
            return;
        }
        const RS = upAvg / -downAvg;
        return 100 - 100 / (1 + RS);
    }
    /**
     * Get history
     */
    get history() {
        if (this.hist.length <= 0) {
            return;
        }
        return this.hist;
    }
    get value() {
        if (!this.rsi) {
            return -1;
        }
        return this.rsi;
    }
}
exports.RSI = RSI;
