"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalAction = exports.ConditionalTriggerDirection = exports.ConditionalTriggerMode = exports.ConditionalKind = void 0;
// ── Phase 1633.G — conditional / RFQ / combo v2 ───────────────────────────
/**
 * `register_conditional_order::kind` — order template.
 * Const-shaped object (not enum) so the SDK doesn't pull in tsc enum runtime.
 */
exports.ConditionalKind = {
    StopLoss: 0,
    TakeProfit: 1,
};
/** `register_conditional_order::trigger_mode` — Spot vs Pyth EMA. */
exports.ConditionalTriggerMode = {
    Spot: 0,
    Ema: 1,
};
/** `register_conditional_order::trigger_direction` — which side of the trigger. */
exports.ConditionalTriggerDirection = {
    Above: 0,
    Below: 1,
};
/**
 * `register_conditional_order::action` — what `apply_*_action` call to
 * dispatch when the trigger condition has held for `triggerGraceSlots`.
 */
exports.ConditionalAction = {
    EarlyExercise: 0,
    CloseIsolated: 1,
    SellViaRfq: 2,
    BuybackViaRfq: 3,
};
//# sourceMappingURL=types.js.map