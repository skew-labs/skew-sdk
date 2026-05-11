import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ApplySellViaRfqActionAccounts {
  user: PublicKey
  order: PublicKey
}

export function applySellViaRfqAction(
  accounts: ApplySellViaRfqActionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.user, isSigner: true, isWritable: true },
    { pubkey: accounts.order, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([1, 205, 226, 220, 35, 182, 210, 116])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
