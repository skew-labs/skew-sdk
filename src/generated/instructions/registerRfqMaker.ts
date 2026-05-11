import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterRfqMakerAccounts {
  mm: PublicKey
  registry: PublicKey
  system_program: PublicKey
}

export function registerRfqMaker(
  accounts: RegisterRfqMakerAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.registry, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([204, 11, 32, 119, 47, 224, 88, 224])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
