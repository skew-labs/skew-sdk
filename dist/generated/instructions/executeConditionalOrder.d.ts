import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface ExecuteConditionalOrderAccounts {
    caller: PublicKey;
    order: PublicKey;
    trigger_oracle: PublicKey;
    action_target: PublicKey;
    linked_order: PublicKey;
    governance: PublicKey;
}
export declare function executeConditionalOrder(accounts: ExecuteConditionalOrderAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=executeConditionalOrder.d.ts.map