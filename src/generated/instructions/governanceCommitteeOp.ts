import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GovernanceCommitteeOpArgs {
  op: types.GovernanceCommitteeOpKindKind
  change_id: BN
  op_kind: types.CommitteeMemberOpKind
  target: PublicKey
  independent: boolean
  signed_at_slot: BN
}

export interface GovernanceCommitteeOpAccounts {
  governance: PublicKey
  committee: PublicKey
  proposal: PublicKey
  signer: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  types.GovernanceCommitteeOpKind.layout("op"),
  borsh.u64("change_id"),
  types.CommitteeMemberOp.layout("op_kind"),
  borsh.publicKey("target"),
  borsh.bool("independent"),
  borsh.u64("signed_at_slot"),
])

export function governanceCommitteeOp(
  args: GovernanceCommitteeOpArgs,
  accounts: GovernanceCommitteeOpAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
    { pubkey: accounts.committee, isSigner: false, isWritable: true },
    { pubkey: accounts.proposal, isSigner: false, isWritable: true },
    { pubkey: accounts.signer, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([25, 138, 190, 226, 117, 203, 222, 39])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      op: args.op.toEncodable(),
      change_id: args.change_id,
      op_kind: args.op_kind.toEncodable(),
      target: args.target,
      independent: args.independent,
      signed_at_slot: args.signed_at_slot,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
