import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RecoveryApplyVmghArgs {
  haircut_bps: number
  drained_micro: BN
  gain_snapshot_digest: Array<number>
}

export interface RecoveryApplyVmghAccounts {
  authority: PublicKey
  recovery_state: PublicKey
  fee_accumulator: PublicKey
  drained_vault: PublicKey
  fee_authority: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([
  borsh.u16("haircut_bps"),
  borsh.u64("drained_micro"),
  borsh.array(borsh.u8(), 32, "gain_snapshot_digest"),
])

export function recoveryApplyVmgh(
  args: RecoveryApplyVmghArgs,
  accounts: RecoveryApplyVmghAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.recovery_state, isSigner: false, isWritable: true },
    { pubkey: accounts.fee_accumulator, isSigner: false, isWritable: true },
    { pubkey: accounts.drained_vault, isSigner: false, isWritable: true },
    { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([173, 247, 130, 219, 183, 30, 200, 227])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      haircut_bps: args.haircut_bps,
      drained_micro: args.drained_micro,
      gain_snapshot_digest: args.gain_snapshot_digest,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
