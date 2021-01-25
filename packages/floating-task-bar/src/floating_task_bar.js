var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var _a, _b;
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useOnEscape } from '@biotic-ui/std';
export var Position;
(function (Position) {
    Position[Position["Bottom"] = 0] = "Bottom";
    Position[Position["Top"] = 1] = "Top";
    Position[Position["Left"] = 2] = "Left";
    Position[Position["Right"] = 3] = "Right";
})(Position || (Position = {}));
function getPosition(position) {
    switch (position) {
        case Position.Top:
            return 'top: var(--baseline-2)';
        case Position.Left:
            return 'left: var(--baseline-2)';
        case Position.Right:
            return 'right: var(--baseline-2)';
        case Position.Bottom:
            return 'bottom: var(--baseline-2);';
    }
}
function getTaskDirection(position) {
    if (position === Position.Top || position === Position.Bottom) {
        return 'row';
    }
    return 'column';
}
export var StyledFloatingTaskBar = styled(motion.div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tposition: fixed;\n\t", ";\n\tleft: 50%;\n\ttransform: translateX(-50%);\n"], ["\n\tposition: fixed;\n\t", ";\n\tleft: 50%;\n\ttransform: translateX(-50%);\n"])), function (p) { return getPosition(p.position); });
function getPadding(position) {
    if (position === Position.Top || position === Position.Bottom) {
        return 'var(--baseline-2) calc(var(--baseline) * 7)';
    }
    return 'calc(var(--baseline) * 4) var(--baseline-2) ';
}
export var FloatingTaskBarContent = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tposition: relative;\n\tbackground: var(--task-bar-background, #000);\n\tpadding: ", ";\n\tdisplay: inline-flex;\n\tflex-direction: ", ";\n\tgrid-column-gap: var(--baseline-3);\n\tgrid-row-gap: var(--baseline-3);\n\tborder-radius: var(--baseline-2);\n\t", "\n"], ["\n\tposition: relative;\n\tbackground: var(--task-bar-background, #000);\n\tpadding: ", ";\n\tdisplay: inline-flex;\n\tflex-direction: ", ";\n\tgrid-column-gap: var(--baseline-3);\n\tgrid-row-gap: var(--baseline-3);\n\tborder-radius: var(--baseline-2);\n\t", "\n"])), function (p) { return getPadding(p.position); }, function (p) { return getTaskDirection(p.position); }, function (p) { return p.open ? 'box-shadow: var(--shadow-5);' : ''; });
export var FloatingTaskBar = function (_a) {
    var _b, _c, _d, _e;
    var children = _a.children, onClose = (_b = _a.onClose, _b === void 0 ? function () { } : _b), open = (_c = _a.open, _c === void 0 ? false : _c), position = (_d = _a.position, _d === void 0 ? Position.Bottom : _d), closeBotton = (_e = _a.closeBotton, _e === void 0 ? true : _e), props = __rest(_a, ["children", "onClose", "open", "position", "closeBotton"]);
    var variants = {
        hidden: {
            transform: hiddenTransform[position],
            opacity: 0,
        },
        visible: {
            transform: visibleTransform[position],
            opacity: 1,
        }
    };
    useOnEscape(onClose);
    return (React.createElement(StyledFloatingTaskBar, __assign({ initial: 'hidden', animate: open ? 'visible' : 'hidden', variants: variants, position: position }, props),
        React.createElement(FloatingTaskBarContent, { open: open, position: position },
            children,
            closeBotton &&
                React.createElement(CloseWrapper, { onClick: onClose },
                    React.createElement(X, null)))));
};
var hiddenTransform = (_a = {},
    _a[Position.Bottom] = 'translateY(100%) translateX(-50%)',
    _a[Position.Top] = 'translateY(-100%) translateX(-50%)',
    _a[Position.Right] = 'translateX(100%)',
    _a[Position.Left] = 'translateX(-100%)',
    _a);
var visibleTransform = (_b = {},
    _b[Position.Bottom] = 'translateY(0%) translateX(-50%)',
    _b[Position.Top] = 'translateY(0%) translateX(-50%)',
    _b[Position.Right] = 'translateX(0%)',
    _b[Position.Left] = 'translateX(0%)',
    _b);
export var Task = styled.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t--size: calc(var(--baseline) * 6);\n\tmin-width: var(--size);\n\tmin-height: var(--size);\n\tpadding: var(---baseline);\n\tposition: relative;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbackground: none;\n\tborder: none;\n\tcolor: var(--task-bar-color, #fff);\n\tflex-direction: column;\n\n\tsvg {\n\t\tfill: currentColor;\n\t}\n"], ["\n\t--size: calc(var(--baseline) * 6);\n\tmin-width: var(--size);\n\tmin-height: var(--size);\n\tpadding: var(---baseline);\n\tposition: relative;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbackground: none;\n\tborder: none;\n\tcolor: var(--task-bar-color, #fff);\n\tflex-direction: column;\n\n\tsvg {\n\t\tfill: currentColor;\n\t}\n"])));
export var TaskLabel = styled.label(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\twidth: 100%;\n\ttext-align: center;\n\tdisplay: block;\n\tmargin-top: var(--baseline);\n\tmargin-bottom: 0;\n"], ["\n\twidth: 100%;\n\ttext-align: center;\n\tdisplay: block;\n\tmargin-top: var(--baseline);\n\tmargin-bottom: 0;\n"])));
var CloseWrapper = styled.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\tposition: absolute;\n\ttop: -8px;\n\tright: -8px;\n\tbackground: #fff;\n\tborder: 1px solid var(--task-bar-background, #000);\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 50%;\n\twidth: 24px;\n\theight: 24px;\n\tpadding: 4px;\n\n\tsvg {\n\t\twidth: var(--baseline-3);\n\t\theight: var(--baseline-3);\n\t}\n"], ["\n\tposition: absolute;\n\ttop: -8px;\n\tright: -8px;\n\tbackground: #fff;\n\tborder: 1px solid var(--task-bar-background, #000);\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 50%;\n\twidth: 24px;\n\theight: 24px;\n\tpadding: 4px;\n\n\tsvg {\n\t\twidth: var(--baseline-3);\n\t\theight: var(--baseline-3);\n\t}\n"])));
var X = function () {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "192", height: "192", fill: "var(--task-bar-background, #000)", viewBox: "0 0 256 256" },
        React.createElement("rect", { width: "256", height: "256", fill: "none" }),
        React.createElement("line", { x1: "200", y1: "56", x2: "56", y2: "200", stroke: "var(--task-bar-background, #000)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" }),
        React.createElement("line", { x1: "200", y1: "200", x2: "56", y2: "56", stroke: "var(--task-bar-background, #000)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "16" })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
