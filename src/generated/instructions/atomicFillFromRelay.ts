import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AtomicFillFromRelayArgs {
  payload: types.RelayPayloadFields
}

export interface AtomicFillFromRelayAccounts {
  option: PublicKey
  seller_cm: PublicKey
  rfq_maker_registry: PublicKey
  position_registry: PublicKey
  buyer: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  buyer_premium_ata: PublicKey
  seller_premium_ata: PublicKey
  fee_accumulator: PublicKey
  fee_authority: PublicKey
  seller_collateral_ata: PublicKey
  option_escrow: PublicKey
  option_collateral_lock: PublicKey
  series_listing: PublicKey
  option_token_mint: PublicKey
  buyer_option_token_ata: PublicKey
  pyth_price: PublicKey
  swb_aggregator: PublicKey
  instructions_sysvar: PublicKey
  system_program: PublicKey
  token_program: PublicKey
  associated_token_program: PublicKey
  governance: PublicKey
  buyer_volume_tracker: PublicKey
  seller_volume_tracker: PublicKey
  fee_config: PublicKey
  builder_code: PublicKey
  builder_escrow: PublicKey
  lst_vault: PublicKey
  lst_vault_ata: PublicKey
  jitosol_stake_pool: PublicKey
  native_sol_vault: PublicKey
  native_sol_vault_ata: PublicKey
}

export const layout = borsh.struct([types.RelayPayload.layout("payload")])

export function atomicFillFromRelay(
  args: AtomicFillFromRelayArgs,
  accounts: AtomicFillFromRelayAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.seller_cm, isSigner: false, isWritable: true },
    { pubkey: accounts.rfq_maker_registry, isSigner: false, isWritable: true },
    { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.buyer_premium_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.seller_premium_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.fee_accumulator, isSigner: false, isWritable: true },
    { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
    {
      pubkey: accounts.seller_collateral_ata,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.option_escrow, isSigner: false, isWritable: true },
    {
      pubkey: accounts.option_collateral_lock,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.series_listing, isSigner: false, isWritable: true },
    { pubkey: accounts.option_token_mint, isSigner: false, isWritable: true },
    {
      pubkey: accounts.buyer_option_token_ata,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.pyth_price, isSigner: false, isWritable: false },
    { pubkey: accounts.swb_aggregator, isSigner: false, isWritable: false },
    {
      pubkey: accounts.instructions_sysvar,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associated_token_program,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
    {
      pubkey: accounts.buyer_volume_tracker,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.seller_volume_tracker,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.fee_config, isSigner: false, isWritable: false },
    { pubkey: accounts.builder_code, isSigner: false, isWritable: true },
    { pubkey: accounts.builder_escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.lst_vault, isSigner: false, isWritable: true },
    { pubkey: accounts.lst_vault_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.jitosol_stake_pool, isSigner: false, isWritable: false },
    { pubkey: accounts.native_sol_vault, isSigner: false, isWritable: true },
    {
      pubkey: accounts.native_sol_vault_ata,
      isSigner: false,
      isWritable: true,
    },
  ]
  const identifier = Buffer.from([251, 160, 84, 11, 62, 3, 74, 250])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      payload: types.RelayPayload.toEncodable(args.payload),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
