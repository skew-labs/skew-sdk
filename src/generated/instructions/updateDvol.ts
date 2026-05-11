import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateDvolArgs {
  asset: number
  dvol_28d_micro: BN
  dvol_90d_micro: BN
  realized_var_28d_micro: BN
}

export interface UpdateDvolAccounts {
  dvol_pda: PublicKey
  authority: PublicKey
  system_program: PublicKey
  rent: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("asset"),
  borsh.u64("dvol_28d_micro"),
  borsh.u64("dvol_90d_micro"),
  borsh.u64("realized_var_28d_micro"),
])

export function updateDvol(
  args: UpdateDvolArgs,
  accounts: UpdateDvolAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.dvol_pda, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([131, 197, 233, 42, 189, 223, 90, 91])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      asset: args.asset,
      dvol_28d_micro: args.dvol_28d_micro,
      dvol_90d_micro: args.dvol_90d_micro,
      realized_var_28d_micro: args.realized_var_28d_micro,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
