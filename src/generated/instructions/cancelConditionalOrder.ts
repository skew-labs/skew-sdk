import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CancelConditionalOrderAccounts {
  authority: PublicKey
  order: PublicKey
}

export function cancelConditionalOrder(
  accounts: CancelConditionalOrderAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.order, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([82, 104, 25, 51, 248, 54, 66, 184])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
