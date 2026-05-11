import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SubmitRfqQuoteArgs {
  args: types.SubmitRfqQuoteArgsFields
}

export interface SubmitRfqQuoteAccounts {
  mm: PublicKey
  registry: PublicKey
  auction: PublicKey
  ix_sysvar: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([types.SubmitRfqQuoteArgs.layout("args")])

export function submitRfqQuote(
  args: SubmitRfqQuoteArgs,
  accounts: SubmitRfqQuoteAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.registry, isSigner: false, isWritable: true },
    { pubkey: accounts.auction, isSigner: false, isWritable: true },
    { pubkey: accounts.ix_sysvar, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([227, 124, 174, 46, 203, 73, 20, 185])
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
