import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ExpireAbandonedAccounts {
  option: PublicKey
  caller: PublicKey
  escrow_token_account: PublicKey
  creator_refund_token_account: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  token_program: PublicKey
}

export function expireAbandoned(
  accounts: ExpireAbandonedAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
    {
      pubkey: accounts.escrow_token_account,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.creator_refund_token_account,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([176, 172, 83, 185, 254, 191, 175, 67])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
