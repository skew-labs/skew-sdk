import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface Tier1JSON {
    kind: "Tier1";
}
export declare class Tier1 {
    static readonly discriminator = 0;
    static readonly kind = "Tier1";
    readonly discriminator = 0;
    readonly kind = "Tier1";
    toJSON(): Tier1JSON;
    toEncodable(): {
        Tier1: {};
    };
}
export interface Tier2JSON {
    kind: "Tier2";
}
export declare class Tier2 {
    static readonly discriminator = 1;
    static readonly kind = "Tier2";
    readonly discriminator = 1;
    readonly kind = "Tier2";
    toJSON(): Tier2JSON;
    toEncodable(): {
        Tier2: {};
    };
}
export interface CrossJSON {
    kind: "Cross";
}
export declare class Cross {
    static readonly discriminator = 2;
    static readonly kind = "Cross";
    readonly discriminator = 2;
    readonly kind = "Cross";
    toJSON(): CrossJSON;
    toEncodable(): {
        Cross: {};
    };
}
export declare function fromDecoded(obj: any): types.IfTierKind;
export declare function fromJSON(obj: types.IfTierJSON): types.IfTierKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=IfTier.d.ts.map