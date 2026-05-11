import * as types from "../types";
export interface SetMakerRiskConfigArgsFields {
    quote_off: boolean;
    identity_mode: number;
    margin_mode: number;
    risk_scope_asset: number;
    collateral_scope: number;
}
export interface SetMakerRiskConfigArgsJSON {
    quote_off: boolean;
    identity_mode: number;
    margin_mode: number;
    risk_scope_asset: number;
    collateral_scope: number;
}
export declare class SetMakerRiskConfigArgs {
    readonly quote_off: boolean;
    readonly identity_mode: number;
    readonly margin_mode: number;
    readonly risk_scope_asset: number;
    readonly collateral_scope: number;
    constructor(fields: SetMakerRiskConfigArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SetMakerRiskConfigArgs;
    static toEncodable(fields: SetMakerRiskConfigArgsFields): {
        quote_off: boolean;
        identity_mode: number;
        margin_mode: number;
        risk_scope_asset: number;
        collateral_scope: number;
    };
    toJSON(): SetMakerRiskConfigArgsJSON;
    static fromJSON(obj: SetMakerRiskConfigArgsJSON): SetMakerRiskConfigArgs;
    toEncodable(): {
        quote_off: boolean;
        identity_mode: number;
        margin_mode: number;
        risk_scope_asset: number;
        collateral_scope: number;
    };
}
//# sourceMappingURL=SetMakerRiskConfigArgs.d.ts.map