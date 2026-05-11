import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateHamiltonStateArgs {
  asset: number
  pi_calm_micro: BN
  pi_stress_micro: BN
  mu_calm_micro: BN
  mu_stress_micro: BN
  sigma_calm_micro: BN
  sigma_stress_micro: BN
  p01_micro: BN
  p10_micro: BN
  consecutive_stress_days: number
  consecutive_calm_days: number
}

export interface UpdateHamiltonStateAccounts {
  authority: PublicKey
  hamilton_state: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("asset"),
  borsh.u64("pi_calm_micro"),
  borsh.u64("pi_stress_micro"),
  borsh.i64("mu_calm_micro"),
  borsh.i64("mu_stress_micro"),
  borsh.u64("sigma_calm_micro"),
  borsh.u64("sigma_stress_micro"),
  borsh.u64("p01_micro"),
  borsh.u64("p10_micro"),
  borsh.u32("consecutive_stress_days"),
  borsh.u32("consecutive_calm_days"),
])

export function updateHamiltonState(
  args: UpdateHamiltonStateArgs,
  accounts: UpdateHamiltonStateAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.hamilton_state, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([120, 246, 251, 17, 73, 112, 36, 47])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      asset: args.asset,
      pi_calm_micro: args.pi_calm_micro,
      pi_stress_micro: args.pi_stress_micro,
      mu_calm_micro: args.mu_calm_micro,
      mu_stress_micro: args.mu_stress_micro,
      sigma_calm_micro: args.sigma_calm_micro,
      sigma_stress_micro: args.sigma_stress_micro,
      p01_micro: args.p01_micro,
      p10_micro: args.p10_micro,
      consecutive_stress_days: args.consecutive_stress_days,
      consecutive_calm_days: args.consecutive_calm_days,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
