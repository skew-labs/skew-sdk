import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface UpdateMicrostructureArgs {
    asset: number;
    spot_micro: BN;
    bid_ask_spread_bps: number;
    depth_100k_usd_micro: BN;
    volume_24h_usd_micro: BN;
    iv_bid_28d_micro: BN;
    iv_ask_28d_micro: BN;
}
export interface UpdateMicrostructureAccounts {
    authority: PublicKey;
    microstructure: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function updateMicrostructure(args: UpdateMicrostructureArgs, accounts: UpdateMicrostructureAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateMicrostructure.d.ts.map