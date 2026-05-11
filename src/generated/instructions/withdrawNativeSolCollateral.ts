import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface WithdrawNativeSolCollateralArgs {
  amount: BN
}

export interface WithdrawNativeSolCollateralAccounts {
  vault: PublicKey
  user: PublicKey
  wsol_mint: PublicKey
  user_wsol_ata: PublicKey
  vault_ata: PublicKey
  token_program: PublicKey
}

export const layout = borsh.struct([borsh.u64("amount")])

export function withdrawNativeSolCollateral(
  args: WithdrawNativeSolCollateralArgs,
  accounts: WithdrawNativeSolCollateralAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.vault, isSigner: false, isWritable: true },
    { pubkey: accounts.user, isSigner: true, isWritable: false },
    { pubkey: accounts.wsol_mint, isSigner: false, isWritable: false },
    { pubkey: accounts.user_wsol_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.vault_ata, isSigner: false, isWritable: true },
    { pubkey: accounts.token_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([186, 252, 128, 120, 97, 106, 181, 98])
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
