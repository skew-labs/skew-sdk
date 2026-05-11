import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitMethodologyCommitteeArgs {
    members: Array<PublicKey>;
    independent_flags: Array<boolean>;
}
export interface InitMethodologyCommitteeAccounts {
    committee: PublicKey;
    authority: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function initMethodologyCommittee(args: InitMethodologyCommitteeArgs, accounts: InitMethodologyCommitteeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initMethodologyCommittee.d.ts.map