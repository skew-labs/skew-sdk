import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MarkDisputedAccounts {
  option: PublicKey
  caller: PublicKey
}

export function markDisputed(
  accounts: MarkDisputedAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
  ]
  const identifier = Buffer.from([136, 86, 152, 120, 3, 21, 223, 251])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
