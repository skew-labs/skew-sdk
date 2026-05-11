import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GovernanceSetPositionLimitArgs {
  asset_idx: number
  new_limit_usd_micro: BN
}

export interface GovernanceSetPositionLimitAccounts {
  authority: PublicKey
  position_limits: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("asset_idx"),
  borsh.u64("new_limit_usd_micro"),
])

export function governanceSetPositionLimit(
  args: GovernanceSetPositionLimitArgs,
  accounts: GovernanceSetPositionLimitAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.position_limits, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([96, 227, 168, 221, 87, 230, 119, 54])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      asset_idx: args.asset_idx,
      new_limit_usd_micro: args.new_limit_usd_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
