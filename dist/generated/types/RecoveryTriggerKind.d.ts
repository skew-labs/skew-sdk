import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface VaultDrainJSON {
    kind: "VaultDrain";
}
export declare class VaultDrain {
    static readonly discriminator = 0;
    static readonly kind = "VaultDrain";
    readonly discriminator = 0;
    readonly kind = "VaultDrain";
    toJSON(): VaultDrainJSON;
    toEncodable(): {
        VaultDrain: {};
    };
}
export interface CommitteeDeterminationJSON {
    kind: "CommitteeDetermination";
}
export declare class CommitteeDetermination {
    static readonly discriminator = 1;
    static readonly kind = "CommitteeDetermination";
    readonly discriminator = 1;
    readonly kind = "CommitteeDetermination";
    toJSON(): CommitteeDeterminationJSON;
    toEncodable(): {
        CommitteeDetermination: {};
    };
}
export declare function fromDecoded(obj: any): types.RecoveryTriggerKindKind;
export declare function fromJSON(obj: types.RecoveryTriggerKindJSON): types.RecoveryTriggerKindKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=RecoveryTriggerKind.d.ts.map