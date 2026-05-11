import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface OpenJSON {
    kind: "Open";
}
export declare class Open {
    static readonly discriminator = 0;
    static readonly kind = "Open";
    readonly discriminator = 0;
    readonly kind = "Open";
    toJSON(): OpenJSON;
    toEncodable(): {
        Open: {};
    };
}
export interface ActiveJSON {
    kind: "Active";
}
export declare class Active {
    static readonly discriminator = 1;
    static readonly kind = "Active";
    readonly discriminator = 1;
    readonly kind = "Active";
    toJSON(): ActiveJSON;
    toEncodable(): {
        Active: {};
    };
}
export interface CancelledJSON {
    kind: "Cancelled";
}
export declare class Cancelled {
    static readonly discriminator = 2;
    static readonly kind = "Cancelled";
    readonly discriminator = 2;
    readonly kind = "Cancelled";
    toJSON(): CancelledJSON;
    toEncodable(): {
        Cancelled: {};
    };
}
export interface SettledJSON {
    kind: "Settled";
}
export declare class Settled {
    static readonly discriminator = 3;
    static readonly kind = "Settled";
    readonly discriminator = 3;
    readonly kind = "Settled";
    toJSON(): SettledJSON;
    toEncodable(): {
        Settled: {};
    };
}
export declare function fromDecoded(obj: any): types.ComboStatusKind;
export declare function fromJSON(obj: types.ComboStatusJSON): types.ComboStatusKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=ComboStatus.d.ts.map