import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RfqMakerReallocV2Accounts {
  mm: PublicKey
  registry: PublicKey
  system_program: PublicKey
}

export function rfqMakerReallocV2(
  accounts: RfqMakerReallocV2Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.registry, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([188, 154, 252, 27, 161, 150, 8, 167])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
