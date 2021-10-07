export declare class ROC {
    private values;
    constructor(period: number);
    nextValue(value: number): number | undefined;
    momentValue(value: number): number | undefined;
}
