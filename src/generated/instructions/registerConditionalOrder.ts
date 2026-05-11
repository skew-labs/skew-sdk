import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterConditionalOrderArgs {
  args: types.RegisterConditionalOrderArgsFields
}

export interface RegisterConditionalOrderAccounts {
  authority: PublicKey
  order: PublicKey
  action_target: PublicKey
  system_program: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([
  types.RegisterConditionalOrderArgs.layout("args"),
])

export function registerConditionalOrder(
  args: RegisterConditionalOrderArgs,
  accounts: RegisterConditionalOrderAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.order, isSigner: false, isWritable: true },
    { pubkey: accounts.action_target, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([255, 95, 30, 67, 98, 0, 93, 211])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.RegisterConditionalOrderArgs.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
