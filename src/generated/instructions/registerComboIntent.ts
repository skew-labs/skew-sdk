import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterComboIntentArgs {
  combo_id: BN
  n_legs: number
  leg_options: Array<PublicKey>
  leg_sides: Array<number>
  leg_max_premiums: Array<BN>
  total_max_premium_micro: BN
  expiry_ts: BN
}

export interface RegisterComboIntentAccounts {
  buyer: PublicKey
  combo: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  buyer_ata: PublicKey
  combo_escrow: PublicKey
  token_program: PublicKey
  system_program: PublicKey
  rent: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([
  borsh.u64("combo_id"),
  borsh.u8("n_legs"),
  borsh.array(borsh.publicKey(), 4, "leg_options"),
  borsh.array(borsh.i8(), 4, "leg_sides"),
  borsh.array(borsh.u64(), 4, "leg_max_premiums"),
  borsh.u64("total_max_premium_micro"),
  borsh.i64("expiry_ts"),
])

export function registerComboIntent(
  args: RegisterComboIntentArgs,
  accounts: RegisterComboIntentAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.combo, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.buyer_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.combo_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([118, 118, 107, 249, 224, 125, 130, 178])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      combo_id: args.combo_id,
      n_legs: args.n_legs,
      leg_options: args.leg_options,
      leg_sides: args.leg_sides,
      leg_max_premiums: args.leg_max_premiums,
      total_max_premium_micro: args.total_max_premium_micro,
      expiry_ts: args.expiry_ts,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
