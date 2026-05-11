import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ClawbackStepArgs {
  target_loss_micro: BN
}

export interface ClawbackStepAccounts {
  insurance_fund: PublicKey
  if_escrow: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  authority: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([borsh.u64("target_loss_micro")])

export function clawbackStep(
  args: ClawbackStepArgs,
  accounts: ClawbackStepAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.insurance_fund, isSigner: false, isWritable: true },
    { pubkey: accounts.if_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([233, 221, 31, 82, 148, 76, 217, 225])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      target_loss_micro: args.target_loss_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
