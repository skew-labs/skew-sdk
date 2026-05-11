import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface EmergencyResumeAccounts {
  authority: PublicKey
  emergency: PublicKey
  governance: PublicKey
}

export function emergencyResume(
  accounts: EmergencyResumeAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.emergency, isSigner: false, isWritable: true },
    { pubkey: accounts.governance, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([0, 243, 48, 185, 6, 73, 190, 83])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
