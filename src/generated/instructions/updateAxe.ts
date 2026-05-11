import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateAxeArgs {
  args: types.PublishAxeArgsFields
}

export interface UpdateAxeAccounts {
  mm: PublicKey
  axe: PublicKey
}

export const layout = borsh.struct([types.PublishAxeArgs.layout("args")])

export function updateAxe(
  args: UpdateAxeArgs,
  accounts: UpdateAxeAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: false },
    { pubkey: accounts.axe, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([246, 145, 132, 47, 236, 154, 72, 207])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.PublishAxeArgs.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
