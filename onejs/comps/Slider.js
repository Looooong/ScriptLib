"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
var jsx_runtime_1 = require("preact/jsx-runtime");
var math_1 = __importDefault(require("math"));
var hooks_1 = require("preact/hooks");
function Slider(_a) {
    var min = _a.min, max = _a.max, value = _a.value, onChange = _a.onChange, onPointerDown = _a.onPointerDown, onPointerMove = _a.onPointerMove, onPointerUp = _a.onPointerUp, $class = _a.class, trackClass = _a.trackClass, trackStyle = _a.trackStyle, activeTrackClass = _a.activeTrackClass, activeTrackStyle = _a.activeTrackStyle, thumbClass = _a.thumbClass, thumbStyle = _a.thumbStyle, props = __rest(_a, ["min", "max", "value", "onChange", "onPointerDown", "onPointerMove", "onPointerUp", "class", "trackClass", "trackStyle", "activeTrackClass", "activeTrackStyle", "thumbClass", "thumbStyle"]);
    var trackRef = (0, hooks_1.useRef)();
    var activeTrackRef = (0, hooks_1.useRef)();
    (0, hooks_1.useEffect)(function () {
        var _a;
        var ratio = math_1.default.unlerp(min !== null && min !== void 0 ? min : 0, max !== null && max !== void 0 ? max : 1, (_a = value !== null && value !== void 0 ? value : min) !== null && _a !== void 0 ? _a : 0);
        activeTrackRef.current.style.width = "".concat(Math.round(ratio * 100), "%");
    }, [min, max, value]);
    var handlePointerDown = (0, hooks_1.useCallback)(function (e) {
        e.currentTarget.CapturePointer(e.pointerId);
        handlerPointerEvent(e);
        onPointerDown === null || onPointerDown === void 0 ? void 0 : onPointerDown(e);
    }, [onPointerDown]);
    var handlePointerMove = (0, hooks_1.useCallback)(function (e) {
        if (e.currentTarget.HasPointerCapture(e.pointerId)) {
            handlerPointerEvent(e);
        }
        onPointerMove === null || onPointerMove === void 0 ? void 0 : onPointerMove(e);
    }, [onPointerMove]);
    var handlePointerUp = (0, hooks_1.useCallback)(function (e) {
        if (e.currentTarget.HasPointerCapture(e.pointerId)) {
            e.currentTarget.ReleasePointer(e.pointerId);
        }
        onPointerUp === null || onPointerUp === void 0 ? void 0 : onPointerUp(e);
    }, [onPointerUp]);
    var handlerPointerEvent = (0, hooks_1.useCallback)(function (e) {
        var width = trackRef.current.ve.layout.width;
        var ratio = math_1.default.saturate(e.localPosition.x / width);
        activeTrackRef.current.style.width = "".concat(Math.round(ratio * 100), "%");
        onChange === null || onChange === void 0 ? void 0 : onChange(math_1.default.lerp(min, max, ratio));
    }, [onChange, min, max]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: trackRef, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: handlePointerUp, class: "h-8 justify-center ".concat($class !== null && $class !== void 0 ? $class : "") }, props, { children: (0, jsx_runtime_1.jsx)("div", { class: "h-2 bg-gray-400 rounded-[4px] ".concat(trackClass !== null && trackClass !== void 0 ? trackClass : ""), style: trackStyle, children: (0, jsx_runtime_1.jsx)("div", { ref: activeTrackRef, class: "accented-bg-color h-2 rounded-[4px] ".concat(activeTrackClass !== null && activeTrackClass !== void 0 ? activeTrackClass : ""), style: activeTrackStyle, children: (0, jsx_runtime_1.jsx)("div", { class: "w-6 h-6 default-bg-color border border-gray-400 rounded-full absolute right-0 bottom-1 translate-3 ".concat(thumbClass !== null && thumbClass !== void 0 ? thumbClass : ""), style: thumbStyle }) }) }) })));
}
exports.Slider = Slider;
