import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CleanupExpiredEmergencyAccounts {
  caller: PublicKey
  emergency: PublicKey
}

export function cleanupExpiredEmergency(
  accounts: CleanupExpiredEmergencyAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
    { pubkey: accounts.emergency, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([132, 167, 106, 81, 208, 126, 122, 232])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
