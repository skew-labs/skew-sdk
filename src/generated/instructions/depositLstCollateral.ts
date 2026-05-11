import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DepositLstCollateralArgs {
  amount: BN
}

export interface DepositLstCollateralAccounts {
  vault: PublicKey
  user: PublicKey
  lst_mint: PublicKey
  user_lst_ata: PublicKey
  vault_ata: PublicKey
  stake_pool: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([borsh.u64("amount")])

export function depositLstCollateral(
  args: DepositLstCollateralArgs,
  accounts: DepositLstCollateralAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.vault, isSigner: false, isWritable: true },
    { pubkey: accounts.user, isSigner: true, isWritable: false },
    { pubkey: accounts.lst_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.user_lst_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.vault_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.stake_pool, isSigner: false, isWritable: false },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([16, 41, 243, 96, 173, 168, 59, 50])
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
