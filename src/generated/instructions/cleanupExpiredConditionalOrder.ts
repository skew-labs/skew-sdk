import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CleanupExpiredConditionalOrderAccounts {
  authority: PublicKey
  caller: PublicKey
  order: PublicKey
}

export function cleanupExpiredConditionalOrder(
  accounts: CleanupExpiredConditionalOrderAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.order, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([195, 119, 237, 107, 136, 207, 221, 163])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
