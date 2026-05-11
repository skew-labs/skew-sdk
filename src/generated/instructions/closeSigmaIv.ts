import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseSigmaIvAccounts {
  sigma_iv_pda: PublicKey
  authority: PublicKey
}

export function closeSigmaIv(
  accounts: CloseSigmaIvAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.sigma_iv_pda, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
  ]
  const identifier = Buffer.from([92, 144, 237, 110, 48, 207, 138, 81])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
