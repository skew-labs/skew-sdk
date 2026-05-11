import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateMicrostructureArgs {
  asset: number
  spot_micro: BN
  bid_ask_spread_bps: number
  depth_100k_usd_micro: BN
  volume_24h_usd_micro: BN
  iv_bid_28d_micro: BN
  iv_ask_28d_micro: BN
}

export interface UpdateMicrostructureAccounts {
  authority: PublicKey
  microstructure: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("asset"),
  borsh.u64("spot_micro"),
  borsh.u32("bid_ask_spread_bps"),
  borsh.u64("depth_100k_usd_micro"),
  borsh.u64("volume_24h_usd_micro"),
  borsh.u64("iv_bid_28d_micro"),
  borsh.u64("iv_ask_28d_micro"),
])

export function updateMicrostructure(
  args: UpdateMicrostructureArgs,
  accounts: UpdateMicrostructureAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.microstructure, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([37, 35, 46, 164, 47, 247, 160, 116])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      asset: args.asset,
      spot_micro: args.spot_micro,
      bid_ask_spread_bps: args.bid_ask_spread_bps,
      depth_100k_usd_micro: args.depth_100k_usd_micro,
      volume_24h_usd_micro: args.volume_24h_usd_micro,
      iv_bid_28d_micro: args.iv_bid_28d_micro,
      iv_ask_28d_micro: args.iv_ask_28d_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
