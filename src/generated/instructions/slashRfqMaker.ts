import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SlashRfqMakerAccounts {
  slasher: PublicKey
  registry: PublicKey
}

export function slashRfqMaker(
  accounts: SlashRfqMakerAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.slasher, isSigner: true, isWritable: true },
    { pubkey: accounts.registry, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([177, 23, 196, 81, 75, 43, 225, 146])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
