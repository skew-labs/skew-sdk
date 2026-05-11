import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterRfqAuctionArgs {
  args: types.RegisterRfqAuctionArgsFields
}

export interface RegisterRfqAuctionAccounts {
  buyer: PublicKey
  auction: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  buyer_usdc_ata: PublicKey
  escrow_ata: PublicKey
  token_program: PublicKey
  system_program: PublicKey
  rent: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([
  types.RegisterRfqAuctionArgs.layout("args"),
])

export function registerRfqAuction(
  args: RegisterRfqAuctionArgs,
  accounts: RegisterRfqAuctionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.auction, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.buyer_usdc_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.escrow_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([73, 62, 193, 185, 112, 9, 221, 36])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.RegisterRfqAuctionArgs.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
