import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface DepositToIfArgs {
    tier: types.IfTierKind;
    amount: BN;
    is_sitg: boolean;
}
export interface DepositToIfAccounts {
    insurance_fund: PublicKey;
    depositor: PublicKey;
    contributing_cm: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    depositor_ata: PublicKey;
    if_escrow: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function depositToIf(args: DepositToIfArgs, accounts: DepositToIfAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=depositToIf.d.ts.map