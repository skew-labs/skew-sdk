import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GovernanceSetSeriesMaxOiArgs {
  max_oi_count: number
}

export interface GovernanceSetSeriesMaxOiAccounts {
  authority: PublicKey
  series: PublicKey
}

export const layout = borsh.struct([borsh.u32("max_oi_count")])

export function governanceSetSeriesMaxOi(
  args: GovernanceSetSeriesMaxOiArgs,
  accounts: GovernanceSetSeriesMaxOiAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.series, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([249, 63, 77, 109, 12, 166, 25, 136])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      max_oi_count: args.max_oi_count,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
