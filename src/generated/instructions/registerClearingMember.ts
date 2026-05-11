import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterClearingMemberArgs {
  initial_collateral_usdc_micro: BN
}

export interface RegisterClearingMemberAccounts {
  cm: PublicKey
  authority: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  authority_usdc_ata: PublicKey
  cm_escrow: PublicKey
  token_program: PublicKey
  system_program: PublicKey
  rent: PublicKey
}

export const layout = borsh.struct([borsh.u64("initial_collateral_usdc_micro")])

export function registerClearingMember(
  args: RegisterClearingMemberArgs,
  accounts: RegisterClearingMemberAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.authority_usdc_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.cm_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([20, 56, 30, 128, 171, 111, 190, 149])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      initial_collateral_usdc_micro: args.initial_collateral_usdc_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
