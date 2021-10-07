export declare class SMMA {
    private period;
    private sum;
    private avg;
    private filled;
    private fill;
    constructor(period: number);
    nextValue(value: number): number | undefined;
    momentValue(value: number): number | undefined;
}
