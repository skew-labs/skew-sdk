import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface GovernanceSetMakerRebatePhaseArgs {
    phase_bps: number;
}
export interface GovernanceSetMakerRebatePhaseAccounts {
    fee_config: PublicKey;
    governance: PublicKey;
    authority: PublicKey;
}
export declare const layout: any;
export declare function governanceSetMakerRebatePhase(args: GovernanceSetMakerRebatePhaseArgs, accounts: GovernanceSetMakerRebatePhaseAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=governanceSetMakerRebatePhase.d.ts.map