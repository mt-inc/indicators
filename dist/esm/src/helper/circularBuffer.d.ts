export declare class CircularBuffer {
    private pointer;
    private buffer;
    private filledCache;
    private length;
    constructor(length: number);
    push(item: number): number;
    pushback(item: number): number;
    current(): number;
    toArray(): number[];
    filled(): boolean;
}
