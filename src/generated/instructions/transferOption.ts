import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface TransferOptionAccounts {
  option: PublicKey
  current_holder: PublicKey
  current_holder_option_ata: PublicKey
  new_holder: PublicKey
  new_holder_option_ata: PublicKey
  option_token_mint: PublicKey
  system_program: PublicKey
  token_program: PublicKey
  associated_token_program: PublicKey
}

export function transferOption(
  accounts: TransferOptionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.current_holder, isSigner: true, isWritable: true },
    {
      pubkey: accounts.current_holder_option_ata,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.new_holder, isSigner: false, isWritable: false },
    {
      pubkey: accounts.new_holder_option_ata,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associated_token_program,
      isSigner: false,
      isWritable: false,
    },
  ]
  const identifier = Buffer.from([166, 82, 240, 67, 23, 249, 34, 105])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
