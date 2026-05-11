import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitCmRiskCacheAccounts {
  payer: PublicKey
  cm: PublicKey
  cm_risk_cache: PublicKey
  system_program: PublicKey
}

export function initCmRiskCache(
  accounts: InitCmRiskCacheAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.cm, isSigner: false, isWritable: false },
    { pubkey: accounts.cm_risk_cache, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([31, 191, 153, 104, 167, 75, 246, 108])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
