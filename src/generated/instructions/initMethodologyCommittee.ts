import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitMethodologyCommitteeArgs {
  members: Array<PublicKey>
  independent_flags: Array<boolean>
}

export interface InitMethodologyCommitteeAccounts {
  committee: PublicKey
  authority: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.array(borsh.publicKey(), 5, "members"),
  borsh.array(borsh.bool(), 5, "independent_flags"),
])

export function initMethodologyCommittee(
  args: InitMethodologyCommitteeArgs,
  accounts: InitMethodologyCommitteeAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.committee, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([111, 143, 53, 199, 1, 93, 123, 43])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      members: args.members,
      independent_flags: args.independent_flags,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
