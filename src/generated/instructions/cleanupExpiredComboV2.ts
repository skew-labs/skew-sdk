import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CleanupExpiredComboV2Accounts {
  buyer: PublicKey
  caller: PublicKey
  intent: PublicKey
}

export function cleanupExpiredComboV2(
  accounts: CleanupExpiredComboV2Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.buyer, isSigner: false, isWritable: true },
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.intent, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([175, 29, 88, 232, 28, 155, 87, 155])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
