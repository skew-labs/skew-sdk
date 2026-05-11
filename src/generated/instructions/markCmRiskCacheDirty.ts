import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MarkCmRiskCacheDirtyArgs {
  dirty_reason: number
}

export interface MarkCmRiskCacheDirtyAccounts {
  caller: PublicKey
  cm: PublicKey
  cm_risk_cache: PublicKey
}

export const layout = borsh.struct([borsh.u8("dirty_reason")])

export function markCmRiskCacheDirty(
  args: MarkCmRiskCacheDirtyArgs,
  accounts: MarkCmRiskCacheDirtyAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
    { pubkey: accounts.cm, isSigner: false, isWritable: false },
    { pubkey: accounts.cm_risk_cache, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([72, 202, 91, 212, 2, 101, 92, 153])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      dirty_reason: args.dirty_reason,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
