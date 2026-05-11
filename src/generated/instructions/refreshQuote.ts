import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RefreshQuoteArgs {
  args: types.SubmitRfqQuoteArgsFields
}

export interface RefreshQuoteAccounts {
  mm: PublicKey
  registry: PublicKey
  auction: PublicKey
  ix_sysvar: PublicKey
}

export const layout = borsh.struct([types.SubmitRfqQuoteArgs.layout("args")])

export function refreshQuote(
  args: RefreshQuoteArgs,
  accounts: RefreshQuoteAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.registry, isSigner: false, isWritable: false },
    { pubkey: accounts.auction, isSigner: false, isWritable: true },
    { pubkey: accounts.ix_sysvar, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([62, 116, 217, 53, 77, 59, 80, 65])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.SubmitRfqQuoteArgs.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
