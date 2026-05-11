import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GovernanceSetMakerRebatePhaseArgs {
  phase_bps: number
}

export interface GovernanceSetMakerRebatePhaseAccounts {
  fee_config: PublicKey
  governance: PublicKey
  authority: PublicKey
}

export const layout = borsh.struct([borsh.u16("phase_bps")])

export function governanceSetMakerRebatePhase(
  args: GovernanceSetMakerRebatePhaseArgs,
  accounts: GovernanceSetMakerRebatePhaseAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.fee_config, isSigner: false, isWritable: true },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
  ]
  const identifier = Buffer.from([128, 18, 228, 241, 120, 77, 133, 170])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      phase_bps: args.phase_bps,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
