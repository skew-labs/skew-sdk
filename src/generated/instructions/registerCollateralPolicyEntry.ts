import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterCollateralPolicyEntryArgs {
  mint: PublicKey
  decimals: number
  kind: number
  oracle_feed: PublicKey
  max_depeg_bps: number
}

export interface RegisterCollateralPolicyEntryAccounts {
  authority: PublicKey
  policy: PublicKey
}

export const layout = borsh.struct([
  borsh.publicKey("mint"),
  borsh.u8("decimals"),
  borsh.u8("kind"),
  borsh.publicKey("oracle_feed"),
  borsh.u16("max_depeg_bps"),
])

export function registerCollateralPolicyEntry(
  args: RegisterCollateralPolicyEntryArgs,
  accounts: RegisterCollateralPolicyEntryAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: false },
    { pubkey: accounts.policy, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([242, 103, 3, 117, 24, 60, 149, 212])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      mint: args.mint,
      decimals: args.decimals,
      kind: args.kind,
      oracle_feed: args.oracle_feed,
      max_depeg_bps: args.max_depeg_bps,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
