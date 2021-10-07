import { ROC } from './roc';
import { EMA } from './ema';
import { saveHistory } from '@mt-inc/utils';
export class TRIX {
    constructor(period) {
        this.hist = [];
        this.ema = new EMA(period);
        this.emaOfEma = new EMA(period);
        this.emaOfEmaOfEma = new EMA(period);
        this.trixRoc = new ROC(1);
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
            if (this.hist.length >= saveHistory) {
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
