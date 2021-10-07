export declare class SMA {
    private arr;
    private sum;
    private filled;
    private period;
    private prev;
    private hist;
    private sma;
    constructor(period: number);
    /** Get next value an affect calculation */
    nextValue(value: number): number | undefined;
    /** Get moment value */
    momentValue(value: number): number | undefined;
    /**
     * Get current value
     */
    get value(): number | undefined;
    /**
     * Get history
     */
    get history(): number[] | undefined;
    /**
     * Get previous
     */
    get previous(): number | undefined;
}
