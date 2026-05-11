import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RecoveryDeclareTriggerArgs {
  trigger_kind: types.RecoveryTriggerKindKind
  protocol_fee_balance_micro: BN
}

export interface RecoveryDeclareTriggerAccounts {
  authority: PublicKey
  recovery_state: PublicKey
  insurance_fund: PublicKey
  committee: PublicKey
  emergency: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  types.RecoveryTriggerKind.layout("trigger_kind"),
  borsh.u64("protocol_fee_balance_micro"),
])

export function recoveryDeclareTrigger(
  args: RecoveryDeclareTriggerArgs,
  accounts: RecoveryDeclareTriggerAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.recovery_state, isSigner: false, isWritable: true },
    { pubkey: accounts.insurance_fund, isSigner: false, isWritable: false },
    { pubkey: accounts.committee, isSigner: false, isWritable: false },
    { pubkey: accounts.emergency, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([170, 44, 217, 60, 157, 215, 161, 81])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      trigger_kind: args.trigger_kind.toEncodable(),
      protocol_fee_balance_micro: args.protocol_fee_balance_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
