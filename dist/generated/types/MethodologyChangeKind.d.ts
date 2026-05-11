import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface OracleHierarchyJSON {
    kind: "OracleHierarchy";
}
export declare class OracleHierarchy {
    static readonly discriminator = 0;
    static readonly kind = "OracleHierarchy";
    readonly discriminator = 0;
    readonly kind = "OracleHierarchy";
    toJSON(): OracleHierarchyJSON;
    toEncodable(): {
        OracleHierarchy: {};
    };
}
export interface DivergenceGateJSON {
    kind: "DivergenceGate";
}
export declare class DivergenceGate {
    static readonly discriminator = 1;
    static readonly kind = "DivergenceGate";
    readonly discriminator = 1;
    readonly kind = "DivergenceGate";
    toJSON(): DivergenceGateJSON;
    toEncodable(): {
        DivergenceGate: {};
    };
}
export interface ConfidenceGateJSON {
    kind: "ConfidenceGate";
}
export declare class ConfidenceGate {
    static readonly discriminator = 2;
    static readonly kind = "ConfidenceGate";
    readonly discriminator = 2;
    readonly kind = "ConfidenceGate";
    toJSON(): ConfidenceGateJSON;
    toEncodable(): {
        ConfidenceGate: {};
    };
}
export interface SsviSurfaceJSON {
    kind: "SsviSurface";
}
export declare class SsviSurface {
    static readonly discriminator = 3;
    static readonly kind = "SsviSurface";
    readonly discriminator = 3;
    readonly kind = "SsviSurface";
    toJSON(): SsviSurfaceJSON;
    toEncodable(): {
        SsviSurface: {};
    };
}
export interface DexTwapFallbackJSON {
    kind: "DexTwapFallback";
}
export declare class DexTwapFallback {
    static readonly discriminator = 4;
    static readonly kind = "DexTwapFallback";
    readonly discriminator = 4;
    readonly kind = "DexTwapFallback";
    toJSON(): DexTwapFallbackJSON;
    toEncodable(): {
        DexTwapFallback: {};
    };
}
export interface OtherJSON {
    kind: "Other";
}
export declare class Other {
    static readonly discriminator = 5;
    static readonly kind = "Other";
    readonly discriminator = 5;
    readonly kind = "Other";
    toJSON(): OtherJSON;
    toEncodable(): {
        Other: {};
    };
}
export declare function fromDecoded(obj: any): types.MethodologyChangeKindKind;
export declare function fromJSON(obj: types.MethodologyChangeKindJSON): types.MethodologyChangeKindKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=MethodologyChangeKind.d.ts.map