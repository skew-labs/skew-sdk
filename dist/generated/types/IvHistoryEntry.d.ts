import BN from "bn.js";
import * as types from "../types";
export interface IvHistoryEntryFields {
    date_unix: BN;
    iv_micro: BN;
    vrp_rel_micro: BN;
}
export interface IvHistoryEntryJSON {
    date_unix: string;
    iv_micro: string;
    vrp_rel_micro: string;
}
export declare class IvHistoryEntry {
    readonly date_unix: BN;
    readonly iv_micro: BN;
    readonly vrp_rel_micro: BN;
    constructor(fields: IvHistoryEntryFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IvHistoryEntry;
    static toEncodable(fields: IvHistoryEntryFields): {
        date_unix: BN;
        iv_micro: BN;
        vrp_rel_micro: BN;
    };
    toJSON(): IvHistoryEntryJSON;
    static fromJSON(obj: IvHistoryEntryJSON): IvHistoryEntry;
    toEncodable(): {
        date_unix: BN;
        iv_micro: BN;
        vrp_rel_micro: BN;
    };
}
//# sourceMappingURL=IvHistoryEntry.d.ts.map