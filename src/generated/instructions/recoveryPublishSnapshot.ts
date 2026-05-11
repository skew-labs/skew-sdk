import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RecoveryPublishSnapshotArgs {
  snapshot_oi_digest: Array<number>
  residual_unfunded_loss_micro: BN
}

export interface RecoveryPublishSnapshotAccounts {
  authority: PublicKey
  recovery_state: PublicKey
  insurance_fund: PublicKey
  emergency: PublicKey
}

export const layout = borsh.struct([
  borsh.array(borsh.u8(), 32, "snapshot_oi_digest"),
  borsh.u64("residual_unfunded_loss_micro"),
])

export function recoveryPublishSnapshot(
  args: RecoveryPublishSnapshotArgs,
  accounts: RecoveryPublishSnapshotAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.recovery_state, isSigner: false, isWritable: true },
    { pubkey: accounts.insurance_fund, isSigner: false, isWritable: false },
    { pubkey: accounts.emergency, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([39, 161, 48, 3, 234, 241, 140, 184])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      snapshot_oi_digest: args.snapshot_oi_digest,
      residual_unfunded_loss_micro: args.residual_unfunded_loss_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
