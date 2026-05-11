import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterOptionMetadataAccounts {
  caller: PublicKey
  option: PublicKey
  option_token_mint: PublicKey
  metadata_pda: PublicKey
  mpl_token_metadata_program: PublicKey
  system_program: PublicKey
  token_program: PublicKey
  rent: PublicKey
}

export function registerOptionMetadata(
  accounts: RegisterOptionMetadataAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.metadata_pda, isSigner: false, isWritable: true },
    {
      pubkey: accounts.mpl_token_metadata_program,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([134, 198, 76, 204, 130, 110, 247, 179])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
