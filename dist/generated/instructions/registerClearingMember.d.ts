import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface RegisterClearingMemberArgs {
    initial_collateral_usdc_micro: BN;
}
export interface RegisterClearingMemberAccounts {
    cm: PublicKey;
    authority: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    authority_usdc_ata: PublicKey;
    cm_escrow: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
}
export declare const layout: any;
export declare function registerClearingMember(args: RegisterClearingMemberArgs, accounts: RegisterClearingMemberAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerClearingMember.d.ts.map