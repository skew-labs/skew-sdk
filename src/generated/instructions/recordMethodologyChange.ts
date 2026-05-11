import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RecordMethodologyChangeArgs {
  kind: types.MethodologyChangeKindKind
  notice_start_slot: BN
  note: Array<number>
}

export interface RecordMethodologyChangeAccounts {
  committee: PublicKey
  decision: PublicKey
  authority: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  types.MethodologyChangeKind.layout("kind"),
  borsh.u64("notice_start_slot"),
  borsh.array(borsh.u8(), 256, "note"),
])

export function recordMethodologyChange(
  args: RecordMethodologyChangeArgs,
  accounts: RecordMethodologyChangeAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.committee, isSigner: false, isWritable: true },
    { pubkey: accounts.decision, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([193, 27, 46, 143, 46, 117, 169, 30])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      kind: args.kind.toEncodable(),
      notice_start_slot: args.notice_start_slot,
      note: args.note,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
