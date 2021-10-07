import { SMA } from './sma';
import { saveHistory } from '@mt-inc/utils';
export class EMA {
    constructor(period) {
        this.period = period;
        this.smooth = 2 / (this.period + 1);
        this.sma = new SMA(this.period);
        this.hist = [];
    }
    /**
     * Get next value for closed candle and
     * affect all next calculations
     */
    nextValue(value) {
        if (!this.ema) {
            this.ema = this.sma.nextValue(value);
            return this.ema;
        }
        this.prev = this.ema;
        this.ema = (value - this.ema) * this.smooth + this.ema;
        if (this.hist.length >= saveHistory) {
            this.hist.shift();
        }
        this.hist.push(this.ema);
        return this.ema;
    }
    /**
     * Get next value for non closed (tick) candle
     * does not affect any next calculations
     */
    momentValue(value) {
        if (!this.ema) {
            return;
        }
        return (value - this.ema) * this.smooth + this.ema;
    }
    /**
     * Get current value
     */
    get value() {
        if (!this.ema) {
            return;
        }
        return this.ema;
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