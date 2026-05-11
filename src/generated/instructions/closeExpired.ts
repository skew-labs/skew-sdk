import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseExpiredAccounts {
  option: PublicKey
  caller: PublicKey
  creator: PublicKey
  escrow_token_account: PublicKey
  creator_token_account: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  token_program: PublicKey
  system_program: PublicKey
}

export function closeExpired(
  accounts: CloseExpiredAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
    { pubkey: accounts.creator, isSigner: false, isWritable: true },
    {
      pubkey: accounts.escrow_token_account,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.creator_token_account,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([138, 186, 164, 245, 32, 116, 162, 62])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
