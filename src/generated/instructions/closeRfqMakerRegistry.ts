import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseRfqMakerRegistryAccounts {
  mm: PublicKey
  registry: PublicKey
}

export function closeRfqMakerRegistry(
  accounts: CloseRfqMakerRegistryAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.registry, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([3, 76, 1, 94, 168, 89, 166, 213])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
