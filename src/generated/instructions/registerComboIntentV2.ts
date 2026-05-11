import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterComboIntentV2Args {
  args: types.RegisterComboV2ArgsFields
}

export interface RegisterComboIntentV2Accounts {
  buyer: PublicKey
  intent: PublicKey
  system_program: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([types.RegisterComboV2Args.layout("args")])

export function registerComboIntentV2(
  args: RegisterComboIntentV2Args,
  accounts: RegisterComboIntentV2Accounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.buyer, isSigner: true, isWritable: true },
    { pubkey: accounts.intent, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([159, 133, 12, 251, 45, 118, 138, 22])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.RegisterComboV2Args.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
