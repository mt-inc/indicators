import { saveHistory } from '@mt-inc/utils';

export class SMA {
  private arr: number[];
  private sum: number;
  private filled: boolean;
  private period: number;
  private prev: number | undefined;
  private hist: number[];
  private sma: number | undefined;

  constructor(period: number) {
    this.filled = false;
    this.period = period;
    this.sum = 0;
    this.arr = [];
    this.hist = [];
  }
  /** Get next value an affect calculation */
  nextValue(value: number) {
    this.filled = this.filled || this.arr.length === this.period;
    this.arr.push(value);

    if (this.filled) {
      this.sum -= this.arr.shift() || 0;
      this.sum += value;
      this.prev = this.sma;
      this.sma = this.sum / this.period;
      if (this.hist.length >= saveHistory) {
        this.hist.shift();
      }
      this.hist.push(this.sma);
      return this.sma;
    }

    this.sum += value;
  }
  /** Get moment value */
  momentValue(value: number) {
    if (!this.filled) {
      return;
    }

    let rmValue = this.arr[0];
    let sum = this.sum;

    sum -= rmValue;
    sum += value;

    return sum / this.period;
  }
  /**
   * Get current value
   */
  get value() {
    if (!this.sma) {
      return;
    }
    return this.sma;
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
