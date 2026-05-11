import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GovernanceExecuteArgs {
  proposal_id: BN
}

export interface GovernanceExecuteAccounts {
  governance: PublicKey
  proposal: PublicKey
  caller: PublicKey
}

export const layout = borsh.struct([borsh.u64("proposal_id")])

export function governanceExecute(
  args: GovernanceExecuteArgs,
  accounts: GovernanceExecuteAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.governance, isSigner: false, isWritable: true },
    { pubkey: accounts.proposal, isSigner: false, isWritable: true },
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
  ]
  const identifier = Buffer.from([42, 32, 118, 220, 21, 229, 66, 139])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      proposal_id: args.proposal_id,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
