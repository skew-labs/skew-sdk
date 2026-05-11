import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseBuilderCodeAccounts {
  builder_code: PublicKey
  builder: PublicKey
  builder_token_account: PublicKey
  builder_escrow: PublicKey
  fee_authority: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  token_program: PublicKey
}

export function closeBuilderCode(
  accounts: CloseBuilderCodeAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.builder_code, isSigner: false, isWritable: true },
    { pubkey: accounts.builder, isSigner: true, isWritable: true },
    {
      pubkey: accounts.builder_token_account,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.builder_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([183, 242, 248, 227, 160, 78, 223, 144])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
