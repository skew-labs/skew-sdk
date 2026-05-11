import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface BuilderCodeClosedFields {
    builder_code_pda: PublicKey;
    builder: PublicKey;
    deposit_refunded: BN;
    final_volume_30d_routed_micro: BN;
    closed_at: BN;
}
export interface BuilderCodeClosedJSON {
    builder_code_pda: string;
    builder: string;
    deposit_refunded: string;
    final_volume_30d_routed_micro: string;
    closed_at: string;
}
export declare class BuilderCodeClosed {
    readonly builder_code_pda: PublicKey;
    readonly builder: PublicKey;
    readonly deposit_refunded: BN;
    readonly final_volume_30d_routed_micro: BN;
    readonly closed_at: BN;
    constructor(fields: BuilderCodeClosedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BuilderCodeClosed;
    static toEncodable(fields: BuilderCodeClosedFields): {
        builder_code_pda: PublicKey;
        builder: PublicKey;
        deposit_refunded: BN;
        final_volume_30d_routed_micro: BN;
        closed_at: BN;
    };
    toJSON(): BuilderCodeClosedJSON;
    static fromJSON(obj: BuilderCodeClosedJSON): BuilderCodeClosed;
    toEncodable(): {
        builder_code_pda: PublicKey;
        builder: PublicKey;
        deposit_refunded: BN;
        final_volume_30d_routed_micro: BN;
        closed_at: BN;
    };
}
//# sourceMappingURL=BuilderCodeClosed.d.ts.map