"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularBuffer = void 0;
class CircularBuffer {
    constructor(length) {
        this.length = length;
        this.buffer = new Array(this.length).fill(0);
        this.filledCache = false;
        this.pointer = 0;
    }
    push(item) {
        const overwrited = this.buffer[this.pointer];
        this.buffer[this.pointer] = item;
        this.pointer = (this.length + this.pointer + 1) % this.length;
        return overwrited;
    }
    pushback(item) {
        this.pointer = (this.length + this.pointer - 1) % this.length;
        const overwrited = this.buffer[this.pointer];
        this.buffer[this.pointer] = item;
        return overwrited;
    }
    current() {
        return this.buffer[this.pointer];
    }
    toArray() {
        return this.buffer;
    }
    filled() {
        this.filledCache = this.filledCache || this.pointer === this.length - 1;
        return this.filledCache;
    }
}
exports.CircularBuffer = CircularBuffer;
