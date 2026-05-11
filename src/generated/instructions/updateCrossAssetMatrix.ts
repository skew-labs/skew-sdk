import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateCrossAssetMatrixArgs {
  rho_p5_btc_eth_micro: number
  rho_p5_btc_sol_micro: number
  rho_p5_btc_xrp_micro: number
  rho_p5_btc_hype_micro: number
  rho_p5_eth_sol_micro: number
  rho_p5_eth_xrp_micro: number
  rho_p5_eth_hype_micro: number
  rho_p5_sol_xrp_micro: number
  rho_p5_sol_hype_micro: number
  rho_p5_xrp_hype_micro: number
  stress_btc_eth_micro: number
  stress_btc_sol_micro: number
  stress_btc_xrp_micro: number
  stress_btc_hype_micro: number
  stress_eth_sol_micro: number
  stress_eth_xrp_micro: number
  stress_eth_hype_micro: number
  stress_sol_xrp_micro: number
  stress_sol_hype_micro: number
  stress_xrp_hype_micro: number
  update_p5: boolean
  update_stress: boolean
}

export interface UpdateCrossAssetMatrixAccounts {
  authority: PublicKey
  matrix: PublicKey
  system_program: PublicKey
}

export const layout = borsh.struct([
  borsh.u32("rho_p5_btc_eth_micro"),
  borsh.u32("rho_p5_btc_sol_micro"),
  borsh.u32("rho_p5_btc_xrp_micro"),
  borsh.u32("rho_p5_btc_hype_micro"),
  borsh.u32("rho_p5_eth_sol_micro"),
  borsh.u32("rho_p5_eth_xrp_micro"),
  borsh.u32("rho_p5_eth_hype_micro"),
  borsh.u32("rho_p5_sol_xrp_micro"),
  borsh.u32("rho_p5_sol_hype_micro"),
  borsh.u32("rho_p5_xrp_hype_micro"),
  borsh.u32("stress_btc_eth_micro"),
  borsh.u32("stress_btc_sol_micro"),
  borsh.u32("stress_btc_xrp_micro"),
  borsh.u32("stress_btc_hype_micro"),
  borsh.u32("stress_eth_sol_micro"),
  borsh.u32("stress_eth_xrp_micro"),
  borsh.u32("stress_eth_hype_micro"),
  borsh.u32("stress_sol_xrp_micro"),
  borsh.u32("stress_sol_hype_micro"),
  borsh.u32("stress_xrp_hype_micro"),
  borsh.bool("update_p5"),
  borsh.bool("update_stress"),
])

export function updateCrossAssetMatrix(
  args: UpdateCrossAssetMatrixArgs,
  accounts: UpdateCrossAssetMatrixAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.matrix, isSigner: false, isWritable: true },
    { pubkey: accounts.system_program, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([108, 239, 157, 100, 48, 251, 94, 45])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      rho_p5_btc_eth_micro: args.rho_p5_btc_eth_micro,
      rho_p5_btc_sol_micro: args.rho_p5_btc_sol_micro,
      rho_p5_btc_xrp_micro: args.rho_p5_btc_xrp_micro,
      rho_p5_btc_hype_micro: args.rho_p5_btc_hype_micro,
      rho_p5_eth_sol_micro: args.rho_p5_eth_sol_micro,
      rho_p5_eth_xrp_micro: args.rho_p5_eth_xrp_micro,
      rho_p5_eth_hype_micro: args.rho_p5_eth_hype_micro,
      rho_p5_sol_xrp_micro: args.rho_p5_sol_xrp_micro,
      rho_p5_sol_hype_micro: args.rho_p5_sol_hype_micro,
      rho_p5_xrp_hype_micro: args.rho_p5_xrp_hype_micro,
      stress_btc_eth_micro: args.stress_btc_eth_micro,
      stress_btc_sol_micro: args.stress_btc_sol_micro,
      stress_btc_xrp_micro: args.stress_btc_xrp_micro,
      stress_btc_hype_micro: args.stress_btc_hype_micro,
      stress_eth_sol_micro: args.stress_eth_sol_micro,
      stress_eth_xrp_micro: args.stress_eth_xrp_micro,
      stress_eth_hype_micro: args.stress_eth_hype_micro,
      stress_sol_xrp_micro: args.stress_sol_xrp_micro,
      stress_sol_hype_micro: args.stress_sol_hype_micro,
      stress_xrp_hype_micro: args.stress_xrp_hype_micro,
      update_p5: args.update_p5,
      update_stress: args.update_stress,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
