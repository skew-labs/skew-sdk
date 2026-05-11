"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyEarlyExerciseAction = applyEarlyExerciseAction;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function applyEarlyExerciseAction(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.user, isSigner: true, isWritable: true },
        { pubkey: accounts.order, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([16, 108, 120, 168, 66, 249, 52, 113]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=applyEarlyExerciseAction.js.map