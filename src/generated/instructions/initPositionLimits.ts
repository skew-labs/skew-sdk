import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitPositionLimitsAccounts {
  authority: PublicKey
  position_limits: PublicKey
  system_program: PublicKey
}

export function initPositionLimits(
  accounts: InitPositionLimitsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.position_limits, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([242, 203, 176, 66, 21, 155, 21, 200])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
