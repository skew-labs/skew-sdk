import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RevokeAxeAccounts {
  mm: PublicKey
  axe: PublicKey
}

export function revokeAxe(
  accounts: RevokeAxeAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.axe, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([100, 117, 58, 248, 203, 241, 125, 26])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
