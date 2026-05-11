import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface AssetImShockBpsJSON {
    kind: "AssetImShockBps";
}
export declare class AssetImShockBps {
    static readonly discriminator = 0;
    static readonly kind = "AssetImShockBps";
    readonly discriminator = 0;
    readonly kind = "AssetImShockBps";
    toJSON(): AssetImShockBpsJSON;
    toEncodable(): {
        AssetImShockBps: {};
    };
}
export interface AssetLiqPremiumBpsJSON {
    kind: "AssetLiqPremiumBps";
}
export declare class AssetLiqPremiumBps {
    static readonly discriminator = 1;
    static readonly kind = "AssetLiqPremiumBps";
    readonly discriminator = 1;
    readonly kind = "AssetLiqPremiumBps";
    toJSON(): AssetLiqPremiumBpsJSON;
    toEncodable(): {
        AssetLiqPremiumBps: {};
    };
}
export interface ConcentrationCapBpsJSON {
    kind: "ConcentrationCapBps";
}
export declare class ConcentrationCapBps {
    static readonly discriminator = 2;
    static readonly kind = "ConcentrationCapBps";
    readonly discriminator = 2;
    readonly kind = "ConcentrationCapBps";
    toJSON(): ConcentrationCapBpsJSON;
    toEncodable(): {
        ConcentrationCapBps: {};
    };
}
export interface IfFloorMicroUsdcJSON {
    kind: "IfFloorMicroUsdc";
}
export declare class IfFloorMicroUsdc {
    static readonly discriminator = 3;
    static readonly kind = "IfFloorMicroUsdc";
    readonly discriminator = 3;
    readonly kind = "IfFloorMicroUsdc";
    toJSON(): IfFloorMicroUsdcJSON;
    toEncodable(): {
        IfFloorMicroUsdc: {};
    };
}
export interface IfTargetBpsJSON {
    kind: "IfTargetBps";
}
export declare class IfTargetBps {
    static readonly discriminator = 4;
    static readonly kind = "IfTargetBps";
    readonly discriminator = 4;
    readonly kind = "IfTargetBps";
    toJSON(): IfTargetBpsJSON;
    toEncodable(): {
        IfTargetBps: {};
    };
}
export interface PremiumFeeBpsJSON {
    kind: "PremiumFeeBps";
}
export declare class PremiumFeeBps {
    static readonly discriminator = 5;
    static readonly kind = "PremiumFeeBps";
    readonly discriminator = 5;
    readonly kind = "PremiumFeeBps";
    toJSON(): PremiumFeeBpsJSON;
    toEncodable(): {
        PremiumFeeBps: {};
    };
}
export interface RfqTakerFeeBpsJSON {
    kind: "RfqTakerFeeBps";
}
export declare class RfqTakerFeeBps {
    static readonly discriminator = 6;
    static readonly kind = "RfqTakerFeeBps";
    readonly discriminator = 6;
    readonly kind = "RfqTakerFeeBps";
    toJSON(): RfqTakerFeeBpsJSON;
    toEncodable(): {
        RfqTakerFeeBps: {};
    };
}
export interface OracleConfidenceBpsJSON {
    kind: "OracleConfidenceBps";
}
export declare class OracleConfidenceBps {
    static readonly discriminator = 7;
    static readonly kind = "OracleConfidenceBps";
    readonly discriminator = 7;
    readonly kind = "OracleConfidenceBps";
    toJSON(): OracleConfidenceBpsJSON;
    toEncodable(): {
        OracleConfidenceBps: {};
    };
}
export interface PythFreshnessSlotsJSON {
    kind: "PythFreshnessSlots";
}
export declare class PythFreshnessSlots {
    static readonly discriminator = 8;
    static readonly kind = "PythFreshnessSlots";
    readonly discriminator = 8;
    readonly kind = "PythFreshnessSlots";
    toJSON(): PythFreshnessSlotsJSON;
    toEncodable(): {
        PythFreshnessSlots: {};
    };
}
export interface PythStaleHaltSlotsJSON {
    kind: "PythStaleHaltSlots";
}
export declare class PythStaleHaltSlots {
    static readonly discriminator = 9;
    static readonly kind = "PythStaleHaltSlots";
    readonly discriminator = 9;
    readonly kind = "PythStaleHaltSlots";
    toJSON(): PythStaleHaltSlotsJSON;
    toEncodable(): {
        PythStaleHaltSlots: {};
    };
}
export declare function fromDecoded(obj: any): types.ParamNameKind;
export declare function fromJSON(obj: types.ParamNameJSON): types.ParamNameKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=ParamName.d.ts.map