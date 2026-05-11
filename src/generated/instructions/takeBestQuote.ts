import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface TakeBestQuoteArgs {
  args: types.TakeBestQuoteArgsFields
}

export interface TakeBestQuoteAccounts {
  buyer: PublicKey
  auction: PublicKey
  usdc_mint: PublicKey
  escrow_ata: PublicKey
  buyer_usdc_ata: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([types.TakeBestQuoteArgs.layout("args")])

export function takeBestQuote(
  args: TakeBestQuoteArgs,
  accounts: TakeBestQuoteAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.auction, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.escrow_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.buyer_usdc_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([6, 196, 223, 125, 192, 7, 43, 199])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.TakeBestQuoteArgs.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
