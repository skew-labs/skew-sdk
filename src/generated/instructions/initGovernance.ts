import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitGovernanceArgs {
  members: Array<PublicKey>
  threshold: number
}

export interface InitGovernanceAccounts {
  governance: PublicKey
  authority: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.array(borsh.publicKey(), 5, "members"),
  borsh.u8("threshold"),
])

export function initGovernance(
  args: InitGovernanceArgs,
  accounts: InitGovernanceAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.governance, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([23, 241, 166, 67, 20, 30, 182, 32])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      members: args.members,
      threshold: args.threshold,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
