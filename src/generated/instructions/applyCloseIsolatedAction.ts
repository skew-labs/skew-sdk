import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ApplyCloseIsolatedActionAccounts {
  user: PublicKey
  order: PublicKey
  option: PublicKey
  vault: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  user_ata: PublicKey
  vault_escrow: PublicKey
  token_program: PublicKey
}

export function applyCloseIsolatedAction(
  accounts: ApplyCloseIsolatedActionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.user, isSigner: true, isWritable: true },
    { pubkey: accounts.order, isSigner: false, isWritable: true },
    { pubkey: accounts.option, isSigner: false, isWritable: false },
    { pubkey: accounts.vault, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.user_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.vault_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([76, 86, 108, 101, 41, 91, 246, 84])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
