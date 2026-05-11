import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SubmitRfqQuoteTxSignedArgs {
  args: types.SubmitRfqQuoteTxSignedArgsFields
}

export interface SubmitRfqQuoteTxSignedAccounts {
  mm: PublicKey
  registry: PublicKey
  auction: PublicKey
  governance: PublicKey
}

export const layout = borsh.struct([
  types.SubmitRfqQuoteTxSignedArgs.layout("args"),
])

export function submitRfqQuoteTxSigned(
  args: SubmitRfqQuoteTxSignedArgs,
  accounts: SubmitRfqQuoteTxSignedAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mm, isSigner: true, isWritable: true },
    { pubkey: accounts.registry, isSigner: false, isWritable: true },
    { pubkey: accounts.auction, isSigner: false, isWritable: true },
    { pubkey: accounts.governance, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([59, 121, 19, 57, 155, 188, 0, 254])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      args: types.SubmitRfqQuoteTxSignedArgs.toEncodable(args.args),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
