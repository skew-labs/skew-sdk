import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UntrackHeldPositionAccounts {
  holder: PublicKey
  cm: PublicKey
  position_registry: PublicKey
  option: PublicKey
  option_token_mint: PublicKey
  holder_option_ata: PublicKey
}

export function untrackHeldPosition(
  accounts: UntrackHeldPositionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.holder, isSigner: true, isWritable: true },
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
    { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
    { pubkey: accounts.option, isSigner: false, isWritable: false },
    { pubkey: accounts.option_token_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.holder_option_ata, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([172, 103, 144, 42, 49, 78, 139, 211])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
