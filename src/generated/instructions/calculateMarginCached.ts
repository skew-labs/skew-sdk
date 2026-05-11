import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CalculateMarginCachedArgs {
  current_spot: number
}

export interface CalculateMarginCachedAccounts {
  caller: PublicKey
  cm: PublicKey
  cm_risk_cache: PublicKey
  position_registry: PublicKey
}

export const layout = borsh.struct([borsh.f64("current_spot")])

export function calculateMarginCached(
  args: CalculateMarginCachedArgs,
  accounts: CalculateMarginCachedAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
    { pubkey: accounts.cm_risk_cache, isSigner: false, isWritable: false },
    { pubkey: accounts.position_registry, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([126, 212, 241, 86, 108, 154, 126, 225])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      current_spot: args.current_spot,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
