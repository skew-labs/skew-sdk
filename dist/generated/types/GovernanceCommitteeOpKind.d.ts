import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface ProposeJSON {
    kind: "Propose";
}
export declare class Propose {
    static readonly discriminator = 0;
    static readonly kind = "Propose";
    readonly discriminator = 0;
    readonly kind = "Propose";
    toJSON(): ProposeJSON;
    toEncodable(): {
        Propose: {};
    };
}
export interface ExecuteJSON {
    kind: "Execute";
}
export declare class Execute {
    static readonly discriminator = 1;
    static readonly kind = "Execute";
    readonly discriminator = 1;
    readonly kind = "Execute";
    toJSON(): ExecuteJSON;
    toEncodable(): {
        Execute: {};
    };
}
export declare function fromDecoded(obj: any): types.GovernanceCommitteeOpKindKind;
export declare function fromJSON(obj: types.GovernanceCommitteeOpKindJSON): types.GovernanceCommitteeOpKindKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=GovernanceCommitteeOpKind.d.ts.map