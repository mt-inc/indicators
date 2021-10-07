"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRIX = void 0;
const roc_1 = require("./roc");
const ema_1 = require("./ema");
const utils_1 = require("@mt-inc/utils");
class TRIX {
    constructor(period) {
        this.hist = [];
        this.ema = new ema_1.EMA(period);
        this.emaOfEma = new ema_1.EMA(period);
        this.emaOfEmaOfEma = new ema_1.EMA(period);
        this.trixRoc = new roc_1.ROC(1);
    }
    /**
     * Get next value for closed candle and
     * affect all next calculations
     */
    nextValue(value) {
        const initialEma = this.ema.nextValue(value);
        const smoothedEma = initialEma ? this.emaOfEma.nextValue(initialEma) : undefined;
        const doubleSmoothedEma = smoothedEma ? this.emaOfEmaOfEma.nextValue(smoothedEma) : undefined;
        const result = doubleSmoothedEma ? this.trixRoc.nextValue(doubleSmoothedEma) : undefined;
        if (result) {
            this.prev = this.trix;
            this.trix = result;
            if (this.hist.length >= utils_1.saveHistory) {
                this.hist.shift();
            }
            this.hist.push(this.trix);
        }
        return result;
    }
    /**
     * Get next value for non closed (tick) candle
     * does not affect any next calculations
     */
    momentValue(value) {
        const initialEma = this.ema.nextValue(value);
        const smoothedEma = initialEma ? this.emaOfEma.nextValue(initialEma) : undefined;
        const doubleSmoothedEma = smoothedEma ? this.emaOfEmaOfEma.nextValue(smoothedEma) : undefined;
        const result = doubleSmoothedEma ? this.trixRoc.nextValue(doubleSmoothedEma) : undefined;
        return result;
    }
    /**
     * Get current value
     */
    get value() {
        if (!this.trix) {
            return;
        }
        return this.trix;
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
    /**
     * Get previous
     */
    get previous() {
        if (!this.prev) {
            return;
        }
        return this.prev;
    }
}
exports.TRIX = TRIX;
