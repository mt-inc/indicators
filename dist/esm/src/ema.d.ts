export declare class EMA {
    private smooth;
    private ema;
    private sma;
    private hist;
    private prev;
    private period;
    constructor(period: number);
    /**
     * Get next value for closed candle and
     * affect all next calculations
     */
    nextValue(value: number): number | undefined;
    /**
     * Get next value for non closed (tick) candle
     * does not affect any next calculations
     */
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
