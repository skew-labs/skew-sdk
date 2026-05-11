import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DelistSeriesAccounts {
  caller: PublicKey
  series: PublicKey
}

export function delistSeries(
  accounts: DelistSeriesAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.series, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([36, 18, 160, 107, 234, 23, 238, 162])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
