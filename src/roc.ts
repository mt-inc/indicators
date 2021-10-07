import { CircularBuffer } from './helper/circularBuffer';

export class ROC {
  private values: CircularBuffer;

  constructor(period: number) {
    this.values = new CircularBuffer(period);
  }

  nextValue(value: number) {
    const outed = this.values.push(value);
    if (outed !== 0) {
      return ((value - outed) / outed) * 100;
    }
  }

  momentValue(value: number) {
    const outed = this.values.current();

    if (outed !== 0) {
      return ((value - outed) / outed) * 100;
    }
  }
}
