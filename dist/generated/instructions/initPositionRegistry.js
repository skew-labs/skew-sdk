"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPositionRegistry = initPositionRegistry;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initPositionRegistry(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.cm, isSigner: false, isWritable: false },
        { pubkey: accounts.position_registry, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: true, isWritable: true },
        { pubkey: accounts.system_program, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([177, 221, 98, 50, 140, 12, 224, 245]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=initPositionRegistry.js.map