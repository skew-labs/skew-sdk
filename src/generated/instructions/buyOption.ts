import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BuyOptionArgs {
  premium: BN
}

export interface BuyOptionAccounts {
  option: PublicKey
  buyer: PublicKey
  premium_from: PublicKey
  premium_to: PublicKey
  settlement_mint: PublicKey
  collateral_policy: PublicKey
  option_token_mint: PublicKey
  option_token_to: PublicKey
  system_program: PublicKey
  token_program: PublicKey
  associated_token_program: PublicKey
  rent: PublicKey
  metadata_pda: PublicKey
  mpl_token_metadata_program: PublicKey
  fee_accumulator: PublicKey
  fee_authority: PublicKey
  sigma_iv_pda: PublicKey
  governance: PublicKey
  buyer_volume_tracker: PublicKey
  fee_config: PublicKey
}

export const layout = borsh.struct([borsh.u64("premium")])

export function buyOption(
  args: BuyOptionArgs,
  accounts: BuyOptionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.option, isSigner: false, isWritable: true },
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.premium_from, isSigner: false, isWritable: true },
    { pubkey: accounts.premium_to, isSigner: false, isWritable: true },
    { pubkey: accounts.settlement_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.option_token_mint, isSigner: false, isWritable: true },
    { pubkey: accounts.option_token_to, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associated_token_program,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.metadata_pda, isSigner: false, isWritable: true },
    {
      pubkey: accounts.mpl_token_metadata_program,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.fee_accumulator, isSigner: false, isWritable: true },
    { pubkey: accounts.fee_authority, isSigner: false, isWritable: false },
    { pubkey: accounts.sigma_iv_pda, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
    {
      pubkey: accounts.buyer_volume_tracker,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.fee_config, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([242, 253, 221, 183, 67, 244, 140, 119])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      premium: args.premium,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
