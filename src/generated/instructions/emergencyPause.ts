import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface EmergencyPauseAccounts {
  authority: PublicKey
  emergency: PublicKey
  governance: PublicKey
}

export function emergencyPause(
  accounts: EmergencyPauseAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.emergency, isSigner: false, isWritable: true },
    { pubkey: accounts.governance, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([21, 143, 27, 142, 200, 181, 210, 255])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
