import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateSigmaIvArgs {
  btc_long: number
  btc_short: number
  eth_long: number
  eth_short: number
  sol_long: number
  sol_short: number
  xrp_long: number
  xrp_short: number
  hype_long: number
  hype_short: number
  update_short: boolean
  update_long: boolean
}

export interface UpdateSigmaIvAccounts {
  authority: PublicKey
  sigma_iv_pda: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.f64("btc_long"),
  borsh.f64("btc_short"),
  borsh.f64("eth_long"),
  borsh.f64("eth_short"),
  borsh.f64("sol_long"),
  borsh.f64("sol_short"),
  borsh.f64("xrp_long"),
  borsh.f64("xrp_short"),
  borsh.f64("hype_long"),
  borsh.f64("hype_short"),
  borsh.bool("update_short"),
  borsh.bool("update_long"),
])

export function updateSigmaIv(
  args: UpdateSigmaIvArgs,
  accounts: UpdateSigmaIvAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.sigma_iv_pda, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([176, 72, 201, 88, 152, 239, 207, 170])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      btc_long: args.btc_long,
      btc_short: args.btc_short,
      eth_long: args.eth_long,
      eth_short: args.eth_short,
      sol_long: args.sol_long,
      sol_short: args.sol_short,
      xrp_long: args.xrp_long,
      xrp_short: args.xrp_short,
      hype_long: args.hype_long,
      hype_short: args.hype_short,
      update_short: args.update_short,
      update_long: args.update_long,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
