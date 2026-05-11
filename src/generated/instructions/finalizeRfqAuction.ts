import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FinalizeRfqAuctionAccounts {
  caller: PublicKey
  auction: PublicKey
  usdc_mint: PublicKey
  collateral_policy: PublicKey
  escrow_ata: PublicKey
  buyer_usdc_ata: PublicKey
  token_program: PublicKey
  governance: PublicKey
}

export function finalizeRfqAuction(
  accounts: FinalizeRfqAuctionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.auction, isSigner: false, isWritable: true },
    { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
    { pubkey: accounts.escrow_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.buyer_usdc_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([200, 244, 107, 69, 79, 161, 2, 186])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
