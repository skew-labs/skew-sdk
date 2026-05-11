import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PublishAxeArgs {
  args: types.PublishAxeArgsFields
}

export interface PublishAxeAccounts {
  mm: PublicKey
  axe: PublicKey
  insurance_fund: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([types.PublishAxeArgs.layout("args")])

export function publishAxe(
  args: PublishAxeArgs,
  accounts: PublishAxeAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.axe, isSigner: false, isWritable: true },
    { pubkey: accounts.insurance_fund, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([153, 178, 68, 10, 56, 150, 172, 11])
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
