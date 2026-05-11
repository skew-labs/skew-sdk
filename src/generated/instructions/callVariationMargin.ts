import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CallVariationMarginAccounts {
  keeper: PublicKey
  cm: PublicKey
}

export function callVariationMargin(
  accounts: CallVariationMarginAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.keeper, isSigner: true, isWritable: false },
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([37, 81, 195, 140, 16, 66, 243, 159])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
