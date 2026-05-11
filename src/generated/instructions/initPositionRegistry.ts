import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitPositionRegistryAccounts {
  cm: PublicKey
  position_registry: PublicKey
  authority: PublicKey
  system_program: PublicKey
}

export function initPositionRegistry(
  accounts: InitPositionRegistryAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.cm, isSigner: false, isWritable: false },
    { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([177, 221, 98, 50, 140, 12, 224, 245])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
