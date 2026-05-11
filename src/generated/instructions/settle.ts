import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SettleAccounts {
  option: PublicKey
  caller: PublicKey
  pyth_price: PublicKey
  escrow_token_account: PublicKey
  option_token_mint: PublicKey
  current_holder_option_ata: PublicKey
  payoff_token_account: PublicKey
  creator_refund_token_account: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  token_program: PublicKey
  creator_cm: PublicKey
  position_registry: PublicKey
  creator_cm_collateral_ata: PublicKey
  swb_aggregator: PublicKey
  fee_accumulator: PublicKey
  fee_authority: PublicKey
  system_program: PublicKey
  rent: PublicKey
  option_collateral_lock: PublicKey
  lst_vault: PublicKey
  lst_vault_ata: PublicKey
  native_sol_vault: PublicKey
  native_sol_vault_ata: PublicKey
  holder_cm: PublicKey
  holder_position_registry: PublicKey
}

export function settle(
  accounts: SettleAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.pyth_price, isSigner: false, isWritable: false },
    {
      pubkey: accounts.escrow_token_account,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
    {
      pubkey: accounts.current_holder_option_ata,
      isSigner: false,
      isWritable: false,
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
    {
      pubkey: accounts.creator_cm_collateral_ata,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.swb_aggregator, isSigner: false, isWritable: false },
    { pubkey: accounts.fee_accumulator, isSigner: false, isWritable: true },
    { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
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
    { pubkey: accounts.holder_cm, isSigner: false, isWritable: true },
    {
      pubkey: accounts.holder_position_registry,
      isSigner: false,
      isWritable: true,
    },
  ]
  const identifier = Buffer.from([175, 42, 185, 87, 144, 131, 102, 212])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
