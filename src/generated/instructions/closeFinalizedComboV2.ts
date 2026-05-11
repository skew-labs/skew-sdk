import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseFinalizedComboV2Accounts {
  buyer: PublicKey
  intent: PublicKey
}

export function closeFinalizedComboV2(
  accounts: CloseFinalizedComboV2Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.intent, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([225, 124, 237, 164, 214, 144, 208, 215])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
