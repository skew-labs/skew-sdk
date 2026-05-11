import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface StandardJSON {
    kind: "Standard";
}
export declare class Standard {
    static readonly discriminator = 0;
    static readonly kind = "Standard";
    readonly discriminator = 0;
    readonly kind = "Standard";
    toJSON(): StandardJSON;
    toEncodable(): {
        Standard: {};
    };
}
export interface SilverJSON {
    kind: "Silver";
}
export declare class Silver {
    static readonly discriminator = 1;
    static readonly kind = "Silver";
    readonly discriminator = 1;
    readonly kind = "Silver";
    toJSON(): SilverJSON;
    toEncodable(): {
        Silver: {};
    };
}
export interface GoldJSON {
    kind: "Gold";
}
export declare class Gold {
    static readonly discriminator = 2;
    static readonly kind = "Gold";
    readonly discriminator = 2;
    readonly kind = "Gold";
    toJSON(): GoldJSON;
    toEncodable(): {
        Gold: {};
    };
}
export interface PlatinumJSON {
    kind: "Platinum";
}
export declare class Platinum {
    static readonly discriminator = 3;
    static readonly kind = "Platinum";
    readonly discriminator = 3;
    readonly kind = "Platinum";
    toJSON(): PlatinumJSON;
    toEncodable(): {
        Platinum: {};
    };
}
export declare function fromDecoded(obj: any): types.VerifiedTierKind;
export declare function fromJSON(obj: types.VerifiedTierJSON): types.VerifiedTierKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=VerifiedTier.d.ts.map