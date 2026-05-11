import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GovernanceApproveArgs {
  signed_at_slot: BN
}

export interface GovernanceApproveAccounts {
  governance: PublicKey
  proposal: PublicKey
  member: PublicKey
}

export const layout = borsh.struct([borsh.u64("signed_at_slot")])

export function governanceApprove(
  args: GovernanceApproveArgs,
  accounts: GovernanceApproveAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
    { pubkey: accounts.proposal, isSigner: false, isWritable: true },
    { pubkey: accounts.member, isSigner: true, isWritable: false },
  ]
  const identifier = Buffer.from([175, 33, 144, 171, 11, 242, 133, 44])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      signed_at_slot: args.signed_at_slot,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
