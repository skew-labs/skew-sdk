import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type ListAssetFields = {
    pythFeed: PublicKey;
    tier: number;
    symbol: Array<number>;
    pMaxFloorBps: number;
    liqPremiumBps: number;
};
export type ListAssetValue = {
    pythFeed: PublicKey;
    tier: number;
    symbol: Array<number>;
    pMaxFloorBps: number;
    liqPremiumBps: number;
};
export interface ListAssetJSON {
    kind: "ListAsset";
    value: {
        pythFeed: string;
        tier: number;
        symbol: Array<number>;
        pMaxFloorBps: number;
        liqPremiumBps: number;
    };
}
export declare class ListAsset {
    static readonly discriminator = 0;
    static readonly kind = "ListAsset";
    readonly discriminator = 0;
    readonly kind = "ListAsset";
    readonly value: ListAssetValue;
    constructor(value: ListAssetFields);
    toJSON(): ListAssetJSON;
    toEncodable(): {
        ListAsset: {
            pyth_feed: PublicKey;
            tier: number;
            symbol: number[];
            p_max_floor_bps: number;
            liq_premium_bps: number;
        };
    };
}
export type DelistAssetFields = {
    panelIdx: number;
};
export type DelistAssetValue = {
    panelIdx: number;
};
export interface DelistAssetJSON {
    kind: "DelistAsset";
    value: {
        panelIdx: number;
    };
}
export declare class DelistAsset {
    static readonly discriminator = 1;
    static readonly kind = "DelistAsset";
    readonly discriminator = 1;
    readonly kind = "DelistAsset";
    readonly value: DelistAssetValue;
    constructor(value: DelistAssetFields);
    toJSON(): DelistAssetJSON;
    toEncodable(): {
        DelistAsset: {
            panel_idx: number;
        };
    };
}
export type UpdateParamFields = {
    name: types.ParamNameKind;
    value: BN;
};
export type UpdateParamValue = {
    name: types.ParamNameKind;
    value: BN;
};
export interface UpdateParamJSON {
    kind: "UpdateParam";
    value: {
        name: types.ParamNameJSON;
        value: string;
    };
}
export declare class UpdateParam {
    static readonly discriminator = 2;
    static readonly kind = "UpdateParam";
    readonly discriminator = 2;
    readonly kind = "UpdateParam";
    readonly value: UpdateParamValue;
    constructor(value: UpdateParamFields);
    toJSON(): UpdateParamJSON;
    toEncodable(): {
        UpdateParam: {
            name: {
                AssetImShockBps: {};
            } | {
                AssetLiqPremiumBps: {};
            } | {
                ConcentrationCapBps: {};
            } | {
                IfFloorMicroUsdc: {};
            } | {
                IfTargetBps: {};
            } | {
                PremiumFeeBps: {};
            } | {
                RfqTakerFeeBps: {};
            } | {
                OracleConfidenceBps: {};
            } | {
                PythFreshnessSlots: {};
            } | {
                PythStaleHaltSlots: {};
            };
            value: BN;
        };
    };
}
export type UpdateWithdrawalLimitFields = {
    newLimitBps: number;
};
export type UpdateWithdrawalLimitValue = {
    newLimitBps: number;
};
export interface UpdateWithdrawalLimitJSON {
    kind: "UpdateWithdrawalLimit";
    value: {
        newLimitBps: number;
    };
}
export declare class UpdateWithdrawalLimit {
    static readonly discriminator = 3;
    static readonly kind = "UpdateWithdrawalLimit";
    readonly discriminator = 3;
    readonly kind = "UpdateWithdrawalLimit";
    readonly value: UpdateWithdrawalLimitValue;
    constructor(value: UpdateWithdrawalLimitFields);
    toJSON(): UpdateWithdrawalLimitJSON;
    toEncodable(): {
        UpdateWithdrawalLimit: {
            new_limit_bps: number;
        };
    };
}
export type UpgradeProgramFields = {
    newProgramId: PublicKey;
};
export type UpgradeProgramValue = {
    newProgramId: PublicKey;
};
export interface UpgradeProgramJSON {
    kind: "UpgradeProgram";
    value: {
        newProgramId: string;
    };
}
export declare class UpgradeProgram {
    static readonly discriminator = 4;
    static readonly kind = "UpgradeProgram";
    readonly discriminator = 4;
    readonly kind = "UpgradeProgram";
    readonly value: UpgradeProgramValue;
    constructor(value: UpgradeProgramFields);
    toJSON(): UpgradeProgramJSON;
    toEncodable(): {
        UpgradeProgram: {
            new_program_id: PublicKey;
        };
    };
}
export type RotateMultisigMemberFields = {
    old: PublicKey;
    new: PublicKey;
};
export type RotateMultisigMemberValue = {
    old: PublicKey;
    new: PublicKey;
};
export interface RotateMultisigMemberJSON {
    kind: "RotateMultisigMember";
    value: {
        old: string;
        new: string;
    };
}
export declare class RotateMultisigMember {
    static readonly discriminator = 5;
    static readonly kind = "RotateMultisigMember";
    readonly discriminator = 5;
    readonly kind = "RotateMultisigMember";
    readonly value: RotateMultisigMemberValue;
    constructor(value: RotateMultisigMemberFields);
    toJSON(): RotateMultisigMemberJSON;
    toEncodable(): {
        RotateMultisigMember: {
            old: PublicKey;
            new: PublicKey;
        };
    };
}
export type ChangeMultisigThresholdFields = {
    newThreshold: number;
};
export type ChangeMultisigThresholdValue = {
    newThreshold: number;
};
export interface ChangeMultisigThresholdJSON {
    kind: "ChangeMultisigThreshold";
    value: {
        newThreshold: number;
    };
}
export declare class ChangeMultisigThreshold {
    static readonly discriminator = 6;
    static readonly kind = "ChangeMultisigThreshold";
    readonly discriminator = 6;
    readonly kind = "ChangeMultisigThreshold";
    readonly value: ChangeMultisigThresholdValue;
    constructor(value: ChangeMultisigThresholdFields);
    toJSON(): ChangeMultisigThresholdJSON;
    toEncodable(): {
        ChangeMultisigThreshold: {
            new_threshold: number;
        };
    };
}
export interface PauseProtocolJSON {
    kind: "PauseProtocol";
}
export declare class PauseProtocol {
    static readonly discriminator = 7;
    static readonly kind = "PauseProtocol";
    readonly discriminator = 7;
    readonly kind = "PauseProtocol";
    toJSON(): PauseProtocolJSON;
    toEncodable(): {
        PauseProtocol: {};
    };
}
export interface UnpauseProtocolJSON {
    kind: "UnpauseProtocol";
}
export declare class UnpauseProtocol {
    static readonly discriminator = 8;
    static readonly kind = "UnpauseProtocol";
    readonly discriminator = 8;
    readonly kind = "UnpauseProtocol";
    toJSON(): UnpauseProtocolJSON;
    toEncodable(): {
        UnpauseProtocol: {};
    };
}
export type AddSettlementFallbackFields = {
    panelIdx: number;
    dexVenue: PublicKey;
};
export type AddSettlementFallbackValue = {
    panelIdx: number;
    dexVenue: PublicKey;
};
export interface AddSettlementFallbackJSON {
    kind: "AddSettlementFallback";
    value: {
        panelIdx: number;
        dexVenue: string;
    };
}
export declare class AddSettlementFallback {
    static readonly discriminator = 9;
    static readonly kind = "AddSettlementFallback";
    readonly discriminator = 9;
    readonly kind = "AddSettlementFallback";
    readonly value: AddSettlementFallbackValue;
    constructor(value: AddSettlementFallbackFields);
    toJSON(): AddSettlementFallbackJSON;
    toEncodable(): {
        AddSettlementFallback: {
            panel_idx: number;
            dex_venue: PublicKey;
        };
    };
}
export type AdjustIccMatrixFields = {
    pairIdx: number;
    newRhoP5Micro: number;
};
export type AdjustIccMatrixValue = {
    pairIdx: number;
    newRhoP5Micro: number;
};
export interface AdjustIccMatrixJSON {
    kind: "AdjustIccMatrix";
    value: {
        pairIdx: number;
        newRhoP5Micro: number;
    };
}
export declare class AdjustIccMatrix {
    static readonly discriminator = 10;
    static readonly kind = "AdjustIccMatrix";
    readonly discriminator = 10;
    readonly kind = "AdjustIccMatrix";
    readonly value: AdjustIccMatrixValue;
    constructor(value: AdjustIccMatrixFields);
    toJSON(): AdjustIccMatrixJSON;
    toEncodable(): {
        AdjustIccMatrix: {
            pair_idx: number;
            new_rho_p5_micro: number;
        };
    };
}
export declare function fromDecoded(obj: any): types.AdminActionKind;
export declare function fromJSON(obj: types.AdminActionJSON): types.AdminActionKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=AdminAction.d.ts.map