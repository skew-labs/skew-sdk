"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cross = exports.Tier2 = exports.Tier1 = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Tier1 {
    constructor() {
        this.discriminator = 0;
        this.kind = "Tier1";
    }
    toJSON() {
        return {
            kind: "Tier1",
        };
    }
    toEncodable() {
        return {
            Tier1: {},
        };
    }
}
exports.Tier1 = Tier1;
Tier1.discriminator = 0;
Tier1.kind = "Tier1";
class Tier2 {
    constructor() {
        this.discriminator = 1;
        this.kind = "Tier2";
    }
    toJSON() {
        return {
            kind: "Tier2",
        };
    }
    toEncodable() {
        return {
            Tier2: {},
        };
    }
}
exports.Tier2 = Tier2;
Tier2.discriminator = 1;
Tier2.kind = "Tier2";
class Cross {
    constructor() {
        this.discriminator = 2;
        this.kind = "Cross";
    }
    toJSON() {
        return {
            kind: "Cross",
        };
    }
    toEncodable() {
        return {
            Cross: {},
        };
    }
}
exports.Cross = Cross;
Cross.discriminator = 2;
Cross.kind = "Cross";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Tier1" in obj) {
        return new Tier1();
    }
    if ("Tier2" in obj) {
        return new Tier2();
    }
    if ("Cross" in obj) {
        return new Cross();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Tier1": {
            return new Tier1();
        }
        case "Tier2": {
            return new Tier2();
        }
        case "Cross": {
            return new Cross();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Tier1"),
        borsh.struct([], "Tier2"),
        borsh.struct([], "Cross"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=IfTier.js.map