import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AdminSettleArgs {
  price: BN
}

export interface AdminSettleAccounts {
  option: PublicKey
  authority: PublicKey
  escrow_token_account: PublicKey
  payoff_token_account: PublicKey
  creator_refund_token_account: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  token_program: PublicKey
  creator_cm: PublicKey
  position_registry: PublicKey
  option_token_mint: PublicKey
  current_holder_option_ata: PublicKey
  cm_escrow_token_account: PublicKey
  option_collateral_lock: PublicKey
  lst_vault: PublicKey
  lst_vault_ata: PublicKey
  native_sol_vault: PublicKey
  native_sol_vault_ata: PublicKey
}

export const layout = borsh.struct([borsh.i64("price")])

export function adminSettle(
  args: AdminSettleArgs,
  accounts: AdminSettleAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    {
      pubkey: accounts.escrow_token_account,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.payoff_token_account,
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
    { pubkey: accounts.creator_cm, isSigner: false, isWritable: true },
    { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
    { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
    {
      pubkey: accounts.current_holder_option_ata,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.cm_escrow_token_account,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.option_collateral_lock,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.lst_vault, isSigner: false, isWritable: true },
    { pubkey: accounts.lst_vault_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.native_sol_vault, isSigner: false, isWritable: true },
    {
      pubkey: accounts.native_sol_vault_ata,
      isSigner: false,
      isWritable: true,
    },
  ]
  const identifier = Buffer.from([138, 218, 221, 118, 96, 220, 75, 11])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      price: args.price,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
