import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface CreatedJSON {
    kind: "Created";
}
export declare class Created {
    static readonly discriminator = 0;
    static readonly kind = "Created";
    readonly discriminator = 0;
    readonly kind = "Created";
    toJSON(): CreatedJSON;
    toEncodable(): {
        Created: {};
    };
}
export interface FundedJSON {
    kind: "Funded";
}
export declare class Funded {
    static readonly discriminator = 1;
    static readonly kind = "Funded";
    readonly discriminator = 1;
    readonly kind = "Funded";
    toJSON(): FundedJSON;
    toEncodable(): {
        Funded: {};
    };
}
export interface ActiveJSON {
    kind: "Active";
}
export declare class Active {
    static readonly discriminator = 2;
    static readonly kind = "Active";
    readonly discriminator = 2;
    readonly kind = "Active";
    toJSON(): ActiveJSON;
    toEncodable(): {
        Active: {};
    };
}
export interface ExpiredJSON {
    kind: "Expired";
}
export declare class Expired {
    static readonly discriminator = 3;
    static readonly kind = "Expired";
    readonly discriminator = 3;
    readonly kind = "Expired";
    toJSON(): ExpiredJSON;
    toEncodable(): {
        Expired: {};
    };
}
export interface SettledJSON {
    kind: "Settled";
}
export declare class Settled {
    static readonly discriminator = 4;
    static readonly kind = "Settled";
    readonly discriminator = 4;
    readonly kind = "Settled";
    toJSON(): SettledJSON;
    toEncodable(): {
        Settled: {};
    };
}
export interface DisputedJSON {
    kind: "Disputed";
}
export declare class Disputed {
    static readonly discriminator = 5;
    static readonly kind = "Disputed";
    readonly discriminator = 5;
    readonly kind = "Disputed";
    toJSON(): DisputedJSON;
    toEncodable(): {
        Disputed: {};
    };
}
export interface ExpiredAbandonedJSON {
    kind: "ExpiredAbandoned";
}
export declare class ExpiredAbandoned {
    static readonly discriminator = 6;
    static readonly kind = "ExpiredAbandoned";
    readonly discriminator = 6;
    readonly kind = "ExpiredAbandoned";
    toJSON(): ExpiredAbandonedJSON;
    toEncodable(): {
        ExpiredAbandoned: {};
    };
}
export declare function fromDecoded(obj: any): types.OptionStateKind;
export declare function fromJSON(obj: types.OptionStateJSON): types.OptionStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=OptionState.d.ts.map