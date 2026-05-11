import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterOcoPairArgs {
  stop_loss: types.RegisterConditionalOrderArgsFields
  take_profit: types.RegisterConditionalOrderArgsFields
}

export interface RegisterOcoPairAccounts {
  authority: PublicKey
  order_a: PublicKey
  order_b: PublicKey
  action_target: PublicKey
  system_program: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([
  types.RegisterConditionalOrderArgs.layout("stop_loss"),
  types.RegisterConditionalOrderArgs.layout("take_profit"),
])

export function registerOcoPair(
  args: RegisterOcoPairArgs,
  accounts: RegisterOcoPairAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.order_a, isSigner: false, isWritable: true },
    { pubkey: accounts.order_b, isSigner: false, isWritable: true },
    { pubkey: accounts.action_target, isSigner: false, isWritable: false },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([204, 146, 43, 72, 239, 136, 76, 168])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      stop_loss: types.RegisterConditionalOrderArgs.toEncodable(args.stop_loss),
      take_profit: types.RegisterConditionalOrderArgs.toEncodable(
        args.take_profit
      ),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
