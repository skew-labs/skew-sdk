"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initInsuranceFund = initInsuranceFund;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initInsuranceFund(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.insurance_fund, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.usdc_mint, isSigner: false, isWritable: false },
        { pubkey: accounts.collateral_policy, isSigner: false, isWritable: false },
        { pubkey: accounts.if_escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.token_program, isSigner: false, isWritable: false },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([92, 192, 77, 17, 160, 115, 251, 28]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initInsuranceFund.js.map