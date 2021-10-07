export class SMMA {
  private sum = 0;
  private avg = 0;
  private filled = false;
  private fill = 0;

  constructor(private period: number) {}

  nextValue(value: number): number | undefined {
    if (this.filled) {
      if (this.avg) {
        this.nextValue = (value: number) =>
          (this.avg = (this.avg * (this.period - 1) + value) / this.period);
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

  momentValue(value: number) {
    if (!this.filled) {
      return;
    }

    return (this.avg * (this.period - 1) + value) / this.period;
  }
}
