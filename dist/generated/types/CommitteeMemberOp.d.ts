import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface AddJSON {
    kind: "Add";
}
export declare class Add {
    static readonly discriminator = 0;
    static readonly kind = "Add";
    readonly discriminator = 0;
    readonly kind = "Add";
    toJSON(): AddJSON;
    toEncodable(): {
        Add: {};
    };
}
export interface RemoveJSON {
    kind: "Remove";
}
export declare class Remove {
    static readonly discriminator = 1;
    static readonly kind = "Remove";
    readonly discriminator = 1;
    readonly kind = "Remove";
    toJSON(): RemoveJSON;
    toEncodable(): {
        Remove: {};
    };
}
export declare function fromDecoded(obj: any): types.CommitteeMemberOpKind;
export declare function fromJSON(obj: types.CommitteeMemberOpJSON): types.CommitteeMemberOpKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=CommitteeMemberOp.d.ts.map