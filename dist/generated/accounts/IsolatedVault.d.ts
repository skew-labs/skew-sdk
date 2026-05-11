import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface IsolatedVaultFields {
    user: PublicKey;
    option: PublicKey;
    usdc_micro: BN;
    locked_micro: BN;
    realized_pnl_micro: BN;
    bump: number;
    _padding: Array<number>;
}
export interface IsolatedVaultJSON {
    user: string;
    option: string;
    usdc_micro: string;
    locked_micro: string;
    realized_pnl_micro: string;
    bump: number;
    _padding: Array<number>;
}
export declare class IsolatedVault {
    readonly user: PublicKey;
    readonly option: PublicKey;
    readonly usdc_micro: BN;
    readonly locked_micro: BN;
    readonly realized_pnl_micro: BN;
    readonly bump: number;
    readonly _padding: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: IsolatedVaultFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<IsolatedVault | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<IsolatedVault | null>>;
    static decode(data: Buffer): IsolatedVault;
    toJSON(): IsolatedVaultJSON;
    static fromJSON(obj: IsolatedVaultJSON): IsolatedVault;
}
//# sourceMappingURL=IsolatedVault.d.ts.map