import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GovernanceProposeArgs {
  action: types.AdminActionKind
  signed_at_slot: BN
}

export interface GovernanceProposeAccounts {
  governance: PublicKey
  proposal: PublicKey
  proposer: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  types.AdminAction.layout("action"),
  borsh.u64("signed_at_slot"),
])

export function governancePropose(
  args: GovernanceProposeArgs,
  accounts: GovernanceProposeAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.governance, isSigner: false, isWritable: true },
    { pubkey: accounts.proposal, isSigner: false, isWritable: true },
    { pubkey: accounts.proposer, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([57, 225, 66, 220, 226, 186, 253, 181])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      action: args.action.toEncodable(),
      signed_at_slot: args.signed_at_slot,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
