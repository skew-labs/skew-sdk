import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateSkewMetricsArgs {
  asset: number
  atm_iv_28d_micro: BN
  rr25_micro: BN
  bf25_micro: BN
  rr10_micro: BN
  atm_slope_micro: BN
  iv_7d_micro: BN
  iv_14d_micro: BN
  iv_21d_micro: BN
  iv_28d_micro: BN
  iv_60d_micro: BN
  iv_90d_micro: BN
  iv_180d_micro: BN
  iv_365d_micro: BN
}

export interface UpdateSkewMetricsAccounts {
  authority: PublicKey
  skew_metrics: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("asset"),
  borsh.u64("atm_iv_28d_micro"),
  borsh.i64("rr25_micro"),
  borsh.i64("bf25_micro"),
  borsh.i64("rr10_micro"),
  borsh.i64("atm_slope_micro"),
  borsh.u64("iv_7d_micro"),
  borsh.u64("iv_14d_micro"),
  borsh.u64("iv_21d_micro"),
  borsh.u64("iv_28d_micro"),
  borsh.u64("iv_60d_micro"),
  borsh.u64("iv_90d_micro"),
  borsh.u64("iv_180d_micro"),
  borsh.u64("iv_365d_micro"),
])

export function updateSkewMetrics(
  args: UpdateSkewMetricsArgs,
  accounts: UpdateSkewMetricsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.skew_metrics, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([96, 124, 131, 43, 23, 210, 93, 92])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      asset: args.asset,
      atm_iv_28d_micro: args.atm_iv_28d_micro,
      rr25_micro: args.rr25_micro,
      bf25_micro: args.bf25_micro,
      rr10_micro: args.rr10_micro,
      atm_slope_micro: args.atm_slope_micro,
      iv_7d_micro: args.iv_7d_micro,
      iv_14d_micro: args.iv_14d_micro,
      iv_21d_micro: args.iv_21d_micro,
      iv_28d_micro: args.iv_28d_micro,
      iv_60d_micro: args.iv_60d_micro,
      iv_90d_micro: args.iv_90d_micro,
      iv_180d_micro: args.iv_180d_micro,
      iv_365d_micro: args.iv_365d_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
