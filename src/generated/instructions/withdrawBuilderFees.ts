import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface WithdrawBuilderFeesArgs {
  amount: BN
}

export interface WithdrawBuilderFeesAccounts {
  builder_code: PublicKey
  builder: PublicKey
  builder_token_account: PublicKey
  builder_escrow: PublicKey
  fee_authority: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([borsh.u64("amount")])

export function withdrawBuilderFees(
  args: WithdrawBuilderFeesArgs,
  accounts: WithdrawBuilderFeesAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.builder_code, isSigner: false, isWritable: true },
    { pubkey: accounts.builder, isSigner: true, isWritable: false },
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
  const identifier = Buffer.from([59, 53, 114, 76, 5, 105, 182, 137])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      amount: args.amount,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
