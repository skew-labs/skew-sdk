import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitIsolatedVaultAccounts {
  user: PublicKey
  option: PublicKey
  vault: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  vault_escrow: PublicKey
  token_program: PublicKey
  system_program: PublicKey
  rent: PublicKey
}

export function initIsolatedVault(
  accounts: InitIsolatedVaultAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.user, isSigner: true, isWritable: true },
    { pubkey: accounts.option, isSigner: false, isWritable: false },
    { pubkey: accounts.vault, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.vault_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([182, 255, 53, 241, 12, 198, 169, 227])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
