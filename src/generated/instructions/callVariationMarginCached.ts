import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CallVariationMarginCachedAccounts {
  keeper: PublicKey
  cm: PublicKey
  cm_risk_cache: PublicKey
  position_registry: PublicKey
}

export function callVariationMarginCached(
  accounts: CallVariationMarginCachedAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.keeper, isSigner: true, isWritable: false },
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
    { pubkey: accounts.cm_risk_cache, isSigner: false, isWritable: false },
    { pubkey: accounts.position_registry, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([147, 116, 42, 74, 170, 252, 157, 238])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
