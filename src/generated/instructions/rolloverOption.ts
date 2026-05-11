import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RolloverOptionArgs {
  new_nonce: BN
  new_expiry_ts: BN
  new_strike: BN
  new_payoff_amount: BN
}

export interface RolloverOptionAccounts {
  creator: PublicKey
  old_option: PublicKey
  new_option: PublicKey
  old_escrow: PublicKey
  new_escrow: PublicKey
  collateral_mint: PublicKey
  collateral_policy: PublicKey
  pyth_price: PublicKey
  token_program: PublicKey
  system_program: PublicKey
  rent: PublicKey
  governance: PublicKey
  swb_aggregator: PublicKey
}

export const layout = borsh.struct([
  borsh.u64("new_nonce"),
  borsh.i64("new_expiry_ts"),
  borsh.u64("new_strike"),
  borsh.u64("new_payoff_amount"),
])

export function rolloverOption(
  args: RolloverOptionArgs,
  accounts: RolloverOptionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.creator, isSigner: true, isWritable: true },
    { pubkey: accounts.old_option, isSigner: false, isWritable: true },
    { pubkey: accounts.new_option, isSigner: false, isWritable: true },
    { pubkey: accounts.old_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.new_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.collateral_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.pyth_price, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
    { pubkey: accounts.swb_aggregator, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([25, 177, 106, 54, 12, 120, 7, 4])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      new_nonce: args.new_nonce,
      new_expiry_ts: args.new_expiry_ts,
      new_strike: args.new_strike,
      new_payoff_amount: args.new_payoff_amount,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
