import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface WithdrawFeesArgs {
  amount: BN
}

export interface WithdrawFeesAccounts {
  authority: PublicKey
  fee_accumulator: PublicKey
  fee_authority: PublicKey
  recipient: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([borsh.u64("amount")])

export function withdrawFees(
  args: WithdrawFeesArgs,
  accounts: WithdrawFeesAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.fee_accumulator, isSigner: false, isWritable: true },
    { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
    { pubkey: accounts.recipient, isSigner: false, isWritable: true },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([198, 212, 171, 109, 144, 215, 174, 89])
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
