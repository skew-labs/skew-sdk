import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ListSeriesArgs {
  asset: number
  strike: BN
  expiry_ts: BN
  option_type: types.OptionTypeKind
  direction: number
}

export interface ListSeriesAccounts {
  caller: PublicKey
  series: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("asset"),
  borsh.u64("strike"),
  borsh.i64("expiry_ts"),
  types.OptionType.layout("option_type"),
  borsh.i8("direction"),
])

export function listSeries(
  args: ListSeriesArgs,
  accounts: ListSeriesAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: true },
    { pubkey: accounts.series, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([223, 92, 74, 191, 6, 29, 64, 139])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      asset: args.asset,
      strike: args.strike,
      expiry_ts: args.expiry_ts,
      option_type: args.option_type.toEncodable(),
      direction: args.direction,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
