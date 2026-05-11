import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseOptionCollateralLockAccounts {
  lock: PublicKey
  caller: PublicKey
  refund: PublicKey
}

export function closeOptionCollateralLock(
  accounts: CloseOptionCollateralLockAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.lock, isSigner: false, isWritable: true },
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
    { pubkey: accounts.refund, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([99, 170, 118, 24, 119, 176, 120, 176])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
