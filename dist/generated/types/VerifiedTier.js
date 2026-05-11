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
exports.Platinum = exports.Gold = exports.Silver = exports.Standard = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Standard {
    constructor() {
        this.discriminator = 0;
        this.kind = "Standard";
    }
    toJSON() {
        return {
            kind: "Standard",
        };
    }
    toEncodable() {
        return {
            Standard: {},
        };
    }
}
exports.Standard = Standard;
Standard.discriminator = 0;
Standard.kind = "Standard";
class Silver {
    constructor() {
        this.discriminator = 1;
        this.kind = "Silver";
    }
    toJSON() {
        return {
            kind: "Silver",
        };
    }
    toEncodable() {
        return {
            Silver: {},
        };
    }
}
exports.Silver = Silver;
Silver.discriminator = 1;
Silver.kind = "Silver";
class Gold {
    constructor() {
        this.discriminator = 2;
        this.kind = "Gold";
    }
    toJSON() {
        return {
            kind: "Gold",
        };
    }
    toEncodable() {
        return {
            Gold: {},
        };
    }
}
exports.Gold = Gold;
Gold.discriminator = 2;
Gold.kind = "Gold";
class Platinum {
    constructor() {
        this.discriminator = 3;
        this.kind = "Platinum";
    }
    toJSON() {
        return {
            kind: "Platinum",
        };
    }
    toEncodable() {
        return {
            Platinum: {},
        };
    }
}
exports.Platinum = Platinum;
Platinum.discriminator = 3;
Platinum.kind = "Platinum";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Standard" in obj) {
        return new Standard();
    }
    if ("Silver" in obj) {
        return new Silver();
    }
    if ("Gold" in obj) {
        return new Gold();
    }
    if ("Platinum" in obj) {
        return new Platinum();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Standard": {
            return new Standard();
        }
        case "Silver": {
            return new Silver();
        }
        case "Gold": {
            return new Gold();
        }
        case "Platinum": {
            return new Platinum();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Standard"),
        borsh.struct([], "Silver"),
        borsh.struct([], "Gold"),
        borsh.struct([], "Platinum"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=VerifiedTier.js.map