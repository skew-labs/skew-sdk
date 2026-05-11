import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateOptionArgs {
  nonce: BN
  option_type: types.OptionTypeKind
  asset: number
  direction: number
  strike: BN
  expiry_ts: BN
  payoff_amount: BN
  settlement_decimals: number
  upper_bound: BN
  extra_param: number
  spot_at_creation: BN
  sigma_at_creation: number
}

export interface CreateOptionAccounts {
  option: PublicKey
  creator: PublicKey
  underlying_feed: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  system_program: PublicKey
  metadata_pda: PublicKey
  mpl_token_metadata_program: PublicKey
  rent: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([
  borsh.u64("nonce"),
  types.OptionType.layout("option_type"),
  borsh.u8("asset"),
  borsh.i8("direction"),
  borsh.u64("strike"),
  borsh.i64("expiry_ts"),
  borsh.u64("payoff_amount"),
  borsh.u8("settlement_decimals"),
  borsh.u64("upper_bound"),
  borsh.f64("extra_param"),
  borsh.i64("spot_at_creation"),
  borsh.f64("sigma_at_creation"),
])

export function createOption(
  args: CreateOptionArgs,
  accounts: CreateOptionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: true, isWritable: true },
    { pubkey: accounts.underlying_feed, isSigner: false, isWritable: false },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.metadata_pda, isSigner: false, isWritable: true },
    {
      pubkey: accounts.mpl_token_metadata_program,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([226, 92, 124, 94, 113, 96, 60, 172])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      nonce: args.nonce,
      option_type: args.option_type.toEncodable(),
      asset: args.asset,
      direction: args.direction,
      strike: args.strike,
      expiry_ts: args.expiry_ts,
      payoff_amount: args.payoff_amount,
      settlement_decimals: args.settlement_decimals,
      upper_bound: args.upper_bound,
      extra_param: args.extra_param,
      spot_at_creation: args.spot_at_creation,
      sigma_at_creation: args.sigma_at_creation,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
