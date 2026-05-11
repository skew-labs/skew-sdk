import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqAuctionPdaFields {
    auction_id: BN;
    buyer: PublicKey;
    option_spec: types.RfqOptionSpecFields;
    max_premium_micro: BN;
    auction_open_slot: BN;
    auction_close_slot: BN;
    best_quote: types.RfqQuoteFields;
    state: number;
    bump: number;
    _padding_0: Array<number>;
    created_at: BN;
    is_block_trade: number;
    block_minimum_size_micro: BN;
    _reserved: Array<number>;
}
export interface RfqAuctionPdaJSON {
    auction_id: string;
    buyer: string;
    option_spec: types.RfqOptionSpecJSON;
    max_premium_micro: string;
    auction_open_slot: string;
    auction_close_slot: string;
    best_quote: types.RfqQuoteJSON;
    state: number;
    bump: number;
    _padding_0: Array<number>;
    created_at: string;
    is_block_trade: number;
    block_minimum_size_micro: string;
    _reserved: Array<number>;
}
export declare class RfqAuctionPda {
    readonly auction_id: BN;
    readonly buyer: PublicKey;
    readonly option_spec: types.RfqOptionSpec;
    readonly max_premium_micro: BN;
    readonly auction_open_slot: BN;
    readonly auction_close_slot: BN;
    readonly best_quote: types.RfqQuote;
    readonly state: number;
    readonly bump: number;
    readonly _padding_0: Array<number>;
    readonly created_at: BN;
    readonly is_block_trade: number;
    readonly block_minimum_size_micro: BN;
    readonly _reserved: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: RfqAuctionPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<RfqAuctionPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<RfqAuctionPda | null>>;
    static decode(data: Buffer): RfqAuctionPda;
    toJSON(): RfqAuctionPdaJSON;
    static fromJSON(obj: RfqAuctionPdaJSON): RfqAuctionPda;
}
//# sourceMappingURL=RfqAuctionPda.d.ts.map