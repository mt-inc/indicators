export declare class AvgChangeProvider {
    private avgGain;
    private avgLoss;
    private prev;
    constructor(period: number);
    nextValue(value: number): {
        upAvg: number | undefined;
        downAvg: number | undefined;
    } | undefined;
    momentValue(value: number): {
        upAvg: number | undefined;
        downAvg: number | undefined;
    };
}
