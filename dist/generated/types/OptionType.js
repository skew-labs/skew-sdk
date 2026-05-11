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
exports.DigitalInverse = exports.VanillaInverse = exports.RangeAccrual = exports.CappedVanilla = exports.Digital = exports.Vanilla = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Vanilla {
    constructor() {
        this.discriminator = 0;
        this.kind = "Vanilla";
    }
    toJSON() {
        return {
            kind: "Vanilla",
        };
    }
    toEncodable() {
        return {
            Vanilla: {},
        };
    }
}
exports.Vanilla = Vanilla;
Vanilla.discriminator = 0;
Vanilla.kind = "Vanilla";
class Digital {
    constructor() {
        this.discriminator = 1;
        this.kind = "Digital";
    }
    toJSON() {
        return {
            kind: "Digital",
        };
    }
    toEncodable() {
        return {
            Digital: {},
        };
    }
}
exports.Digital = Digital;
Digital.discriminator = 1;
Digital.kind = "Digital";
class CappedVanilla {
    constructor() {
        this.discriminator = 2;
        this.kind = "CappedVanilla";
    }
    toJSON() {
        return {
            kind: "CappedVanilla",
        };
    }
    toEncodable() {
        return {
            CappedVanilla: {},
        };
    }
}
exports.CappedVanilla = CappedVanilla;
CappedVanilla.discriminator = 2;
CappedVanilla.kind = "CappedVanilla";
class RangeAccrual {
    constructor() {
        this.discriminator = 3;
        this.kind = "RangeAccrual";
    }
    toJSON() {
        return {
            kind: "RangeAccrual",
        };
    }
    toEncodable() {
        return {
            RangeAccrual: {},
        };
    }
}
exports.RangeAccrual = RangeAccrual;
RangeAccrual.discriminator = 3;
RangeAccrual.kind = "RangeAccrual";
class VanillaInverse {
    constructor() {
        this.discriminator = 4;
        this.kind = "VanillaInverse";
    }
    toJSON() {
        return {
            kind: "VanillaInverse",
        };
    }
    toEncodable() {
        return {
            VanillaInverse: {},
        };
    }
}
exports.VanillaInverse = VanillaInverse;
VanillaInverse.discriminator = 4;
VanillaInverse.kind = "VanillaInverse";
class DigitalInverse {
    constructor() {
        this.discriminator = 5;
        this.kind = "DigitalInverse";
    }
    toJSON() {
        return {
            kind: "DigitalInverse",
        };
    }
    toEncodable() {
        return {
            DigitalInverse: {},
        };
    }
}
exports.DigitalInverse = DigitalInverse;
DigitalInverse.discriminator = 5;
DigitalInverse.kind = "DigitalInverse";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Vanilla" in obj) {
        return new Vanilla();
    }
    if ("Digital" in obj) {
        return new Digital();
    }
    if ("CappedVanilla" in obj) {
        return new CappedVanilla();
    }
    if ("RangeAccrual" in obj) {
        return new RangeAccrual();
    }
    if ("VanillaInverse" in obj) {
        return new VanillaInverse();
    }
    if ("DigitalInverse" in obj) {
        return new DigitalInverse();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Vanilla": {
            return new Vanilla();
        }
        case "Digital": {
            return new Digital();
        }
        case "CappedVanilla": {
            return new CappedVanilla();
        }
        case "RangeAccrual": {
            return new RangeAccrual();
        }
        case "VanillaInverse": {
            return new VanillaInverse();
        }
        case "DigitalInverse": {
            return new DigitalInverse();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Vanilla"),
        borsh.struct([], "Digital"),
        borsh.struct([], "CappedVanilla"),
        borsh.struct([], "RangeAccrual"),
        borsh.struct([], "VanillaInverse"),
        borsh.struct([], "DigitalInverse"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=OptionType.js.map