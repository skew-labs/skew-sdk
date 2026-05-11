import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitGovernanceArgs {
    members: Array<PublicKey>;
    threshold: number;
}
export interface InitGovernanceAccounts {
    governance: PublicKey;
    authority: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function initGovernance(args: InitGovernanceArgs, accounts: InitGovernanceAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initGovernance.d.ts.map