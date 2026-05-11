import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CancelComboIntentAccounts {
  buyer: PublicKey
  combo: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  buyer_ata: PublicKey
  combo_escrow: PublicKey
  token_program: PublicKey
}

export function cancelComboIntent(
  accounts: CancelComboIntentAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.combo, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.buyer_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.combo_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([244, 103, 206, 158, 201, 208, 169, 214])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
