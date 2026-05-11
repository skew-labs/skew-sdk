import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DepositIsolatedArgs {
  amount: BN
}

export interface DepositIsolatedAccounts {
  user: PublicKey
  vault: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  user_ata: PublicKey
  vault_escrow: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([borsh.u64("amount")])

export function depositIsolated(
  args: DepositIsolatedArgs,
  accounts: DepositIsolatedAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.user, isSigner: true, isWritable: true },
    { pubkey: accounts.vault, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.user_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.vault_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([247, 55, 165, 28, 82, 16, 32, 87])
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
