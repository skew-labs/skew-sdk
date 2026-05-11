import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CompressPositionsArgs {
  legs: Array<types.CompressionLegFields>
}

export interface CompressPositionsAccounts {
  authority: PublicKey
  cm: PublicKey
}

export const layout = borsh.struct([
  borsh.vec(types.CompressionLeg.layout(), "legs"),
])

export function compressPositions(
  args: CompressPositionsArgs,
  accounts: CompressPositionsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.cm, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([222, 184, 205, 135, 100, 35, 225, 217])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      legs: args.legs.map((item) => types.CompressionLeg.toEncodable(item)),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
