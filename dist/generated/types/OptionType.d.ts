import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface VanillaJSON {
    kind: "Vanilla";
}
export declare class Vanilla {
    static readonly discriminator = 0;
    static readonly kind = "Vanilla";
    readonly discriminator = 0;
    readonly kind = "Vanilla";
    toJSON(): VanillaJSON;
    toEncodable(): {
        Vanilla: {};
    };
}
export interface DigitalJSON {
    kind: "Digital";
}
export declare class Digital {
    static readonly discriminator = 1;
    static readonly kind = "Digital";
    readonly discriminator = 1;
    readonly kind = "Digital";
    toJSON(): DigitalJSON;
    toEncodable(): {
        Digital: {};
    };
}
export interface CappedVanillaJSON {
    kind: "CappedVanilla";
}
export declare class CappedVanilla {
    static readonly discriminator = 2;
    static readonly kind = "CappedVanilla";
    readonly discriminator = 2;
    readonly kind = "CappedVanilla";
    toJSON(): CappedVanillaJSON;
    toEncodable(): {
        CappedVanilla: {};
    };
}
export interface RangeAccrualJSON {
    kind: "RangeAccrual";
}
export declare class RangeAccrual {
    static readonly discriminator = 3;
    static readonly kind = "RangeAccrual";
    readonly discriminator = 3;
    readonly kind = "RangeAccrual";
    toJSON(): RangeAccrualJSON;
    toEncodable(): {
        RangeAccrual: {};
    };
}
export interface VanillaInverseJSON {
    kind: "VanillaInverse";
}
export declare class VanillaInverse {
    static readonly discriminator = 4;
    static readonly kind = "VanillaInverse";
    readonly discriminator = 4;
    readonly kind = "VanillaInverse";
    toJSON(): VanillaInverseJSON;
    toEncodable(): {
        VanillaInverse: {};
    };
}
export interface DigitalInverseJSON {
    kind: "DigitalInverse";
}
export declare class DigitalInverse {
    static readonly discriminator = 5;
    static readonly kind = "DigitalInverse";
    readonly discriminator = 5;
    readonly kind = "DigitalInverse";
    toJSON(): DigitalInverseJSON;
    toEncodable(): {
        DigitalInverse: {};
    };
}
export declare function fromDecoded(obj: any): types.OptionTypeKind;
export declare function fromJSON(obj: types.OptionTypeJSON): types.OptionTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=OptionType.d.ts.map