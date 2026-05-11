import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseRfqAuctionAccounts {
  refund_target: PublicKey
  auction: PublicKey
  escrow_ata: PublicKey
  token_program: PublicKey
}

export function closeRfqAuction(
  accounts: CloseRfqAuctionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.refund_target, isSigner: false, isWritable: true },
    { pubkey: accounts.auction, isSigner: false, isWritable: true },
    { pubkey: accounts.escrow_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([6, 168, 35, 111, 104, 196, 224, 159])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
