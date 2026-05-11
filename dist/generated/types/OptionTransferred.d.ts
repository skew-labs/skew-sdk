import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionTransferredFields {
    option: PublicKey;
    from: PublicKey;
    to: PublicKey;
    transferred_at: BN;
}
export interface OptionTransferredJSON {
    option: string;
    from: string;
    to: string;
    transferred_at: string;
}
export declare class OptionTransferred {
    readonly option: PublicKey;
    readonly from: PublicKey;
    readonly to: PublicKey;
    readonly transferred_at: BN;
    constructor(fields: OptionTransferredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionTransferred;
    static toEncodable(fields: OptionTransferredFields): {
        option: PublicKey;
        from: PublicKey;
        to: PublicKey;
        transferred_at: BN;
    };
    toJSON(): OptionTransferredJSON;
    static fromJSON(obj: OptionTransferredJSON): OptionTransferred;
    toEncodable(): {
        option: PublicKey;
        from: PublicKey;
        to: PublicKey;
        transferred_at: BN;
    };
}
//# sourceMappingURL=OptionTransferred.d.ts.map