export class CircularBuffer {
  private pointer: number;
  private buffer: number[];
  private filledCache: boolean;
  private length: number;

  constructor(length: number) {
    this.length = length;
    this.buffer = new Array(this.length).fill(0);
    this.filledCache = false;
    this.pointer = 0;
  }

  public push(item: number) {
    const overwrited = this.buffer[this.pointer];
    this.buffer[this.pointer] = item;
    this.pointer = (this.length + this.pointer + 1) % this.length;
    return overwrited;
  }

  public pushback(item: number) {
    this.pointer = (this.length + this.pointer - 1) % this.length;
    const overwrited = this.buffer[this.pointer];
    this.buffer[this.pointer] = item;
    return overwrited;
  }

  public current() {
    return this.buffer[this.pointer];
  }

  public toArray() {
    return this.buffer;
  }

  public filled() {
    this.filledCache = this.filledCache || this.pointer === this.length - 1;
    return this.filledCache;
  }
}
