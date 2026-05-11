"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFeeConfig = initFeeConfig;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initFeeConfig(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.fee_config, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([212, 138, 200, 114, 73, 176, 7, 197]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initFeeConfig.js.map