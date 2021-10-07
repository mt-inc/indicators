import { AvgChangeProvider } from './helper/gain';
import { saveHistory } from '@mt-inc/utils';

export class RSI {
  private change: AvgChangeProvider;
  private rsi?: number;
  private period: number;
  private hist: number[];

  constructor(period = 14) {
    this.period = period;
    this.change = new AvgChangeProvider(this.period);
    this.hist = [];
  }

  nextValue(value: number) {
    const { downAvg, upAvg } = this.change.nextValue(value) || {};

    if (upAvg === undefined || downAvg === undefined) {
      return;
    }

    const RS = upAvg / -downAvg;
    this.rsi = 100 - 100 / (1 + RS);
    if (this.hist.length >= saveHistory) {
      this.hist.shift();
    }
    this.hist.push(this.rsi);
    return this.rsi;
  }

  momentValue(value: number) {
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
