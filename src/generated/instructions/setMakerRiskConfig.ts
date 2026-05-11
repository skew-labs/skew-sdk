import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SetMakerRiskConfigArgs {
  args: types.SetMakerRiskConfigArgsFields
}

export interface SetMakerRiskConfigAccounts {
  mm: PublicKey
  registry: PublicKey
}

export const layout = borsh.struct([
  types.SetMakerRiskConfigArgs.layout("args"),
])

export function setMakerRiskConfig(
  args: SetMakerRiskConfigArgs,
  accounts: SetMakerRiskConfigAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.registry, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([36, 74, 108, 169, 186, 166, 191, 142])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.SetMakerRiskConfigArgs.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
