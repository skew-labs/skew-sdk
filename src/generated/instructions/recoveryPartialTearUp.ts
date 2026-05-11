import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RecoveryPartialTearUpArgs {
  tear_up_bps: number
  terminated_notional_micro: BN
  notional_snapshot_digest: Array<number>
}

export interface RecoveryPartialTearUpAccounts {
  authority: PublicKey
  recovery_state: PublicKey
}

export const layout = borsh.struct([
  borsh.u16("tear_up_bps"),
  borsh.u64("terminated_notional_micro"),
  borsh.array(borsh.u8(), 32, "notional_snapshot_digest"),
])

export function recoveryPartialTearUp(
  args: RecoveryPartialTearUpArgs,
  accounts: RecoveryPartialTearUpAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.recovery_state, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([240, 76, 205, 44, 15, 177, 177, 47])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      tear_up_bps: args.tear_up_bps,
      terminated_notional_micro: args.terminated_notional_micro,
      notional_snapshot_digest: args.notional_snapshot_digest,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
