import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CancelComboIntentV2Accounts {
  buyer: PublicKey
  intent: PublicKey
}

export function cancelComboIntentV2(
  accounts: CancelComboIntentV2Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.intent, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([148, 206, 194, 101, 44, 33, 215, 232])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
