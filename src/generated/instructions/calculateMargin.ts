import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CalculateMarginArgs {
  current_spot: number
}

export interface CalculateMarginAccounts {
  caller: PublicKey
  cm: PublicKey
}

export const layout = borsh.struct([borsh.f64("current_spot")])

export function calculateMargin(
  args: CalculateMarginArgs,
  accounts: CalculateMarginAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.caller, isSigner: true, isWritable: false },
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([100, 112, 147, 203, 153, 146, 3, 43])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      current_spot: args.current_spot,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
