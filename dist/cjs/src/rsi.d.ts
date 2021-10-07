export declare class RSI {
    private change;
    private rsi?;
    private period;
    private hist;
    constructor(period?: number);
    nextValue(value: number): number | undefined;
    momentValue(value: number): number | undefined;
    /**
     * Get history
     */
    get history(): number[] | undefined;
    get value(): number;
}
