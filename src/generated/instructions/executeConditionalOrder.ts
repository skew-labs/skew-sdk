import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ExecuteConditionalOrderAccounts {
  caller: PublicKey
  order: PublicKey
  trigger_oracle: PublicKey
  action_target: PublicKey
  linked_order: PublicKey
  governance: PublicKey
}

export function executeConditionalOrder(
  accounts: ExecuteConditionalOrderAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.order, isSigner: false, isWritable: true },
    { pubkey: accounts.trigger_oracle, isSigner: false, isWritable: false },
    { pubkey: accounts.action_target, isSigner: false, isWritable: false },
    { pubkey: accounts.linked_order, isSigner: false, isWritable: true },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([41, 108, 144, 244, 28, 207, 141, 254])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
