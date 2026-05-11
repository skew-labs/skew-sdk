import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface LiquidateArgs {
  close_factor_bps: number
  min_expected_bonus_bps: number
}

export interface LiquidateAccounts {
  liq_state: PublicKey
  option: PublicKey
  defaulting_cm: PublicKey
  position_registry: PublicKey
  insurance_fund: PublicKey
  option_escrow: PublicKey
  cm_escrow: PublicKey
  if_escrow: PublicKey
  liquidator_payout_ata: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  liquidator: PublicKey
  system_program: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([
  borsh.u16("close_factor_bps"),
  borsh.u16("min_expected_bonus_bps"),
])

export function liquidate(
  args: LiquidateArgs,
  accounts: LiquidateAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.liq_state, isSigner: false, isWritable: true },
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.defaulting_cm, isSigner: false, isWritable: true },
    { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
    { pubkey: accounts.insurance_fund, isSigner: false, isWritable: true },
    { pubkey: accounts.option_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.cm_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.if_escrow, isSigner: false, isWritable: true },
    {
      pubkey: accounts.liquidator_payout_ata,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.liquidator, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([223, 179, 226, 125, 48, 46, 39, 74])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      close_factor_bps: args.close_factor_bps,
      min_expected_bonus_bps: args.min_expected_bonus_bps,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
