import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitNativeSolVaultAccounts {
  vault: PublicKey
  user: PublicKey
  wsol_mint: PublicKey
  vault_ata: PublicKey
  token_program: PublicKey
  system_program: PublicKey
  rent: PublicKey
}

export function initNativeSolVault(
  accounts: InitNativeSolVaultAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.vault, isSigner: false, isWritable: true },
    { pubkey: accounts.user, isSigner: true, isWritable: true },
    { pubkey: accounts.wsol_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.vault_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([7, 161, 184, 100, 178, 56, 37, 115])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
