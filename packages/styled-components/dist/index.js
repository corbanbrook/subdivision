"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var defaults = {
    gutterH: 10,
    gutterV: 10,
    containerSelector: '.grid',
    columnSelector: '*'
};
var percentage = function (d) { return (d * 100).toFixed() + "%"; };
var Subdivision = /** @class */ (function () {
    function Subdivision(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.gutterH = defaults.gutterH;
        this.gutterV = defaults.gutterV;
        this.containerSelector = defaults.containerSelector;
        this.columnSelector = defaults.columnSelector;
        this.column = function (fraction, offset, gutterLeft, gutterRight, center) {
            if (fraction === void 0) { fraction = 1; }
            if (offset === void 0) { offset = 0; }
            if (gutterLeft === void 0) { gutterLeft = _this.gutterH; }
            if (gutterRight === void 0) { gutterRight = _this.gutterH; }
            if (center === void 0) { center = false; }
            var gutterWidth = gutterLeft + gutterRight - _this.gutterH;
            return "\n      flex-basis: calc(" + percentage(fraction) + " - " + gutterWidth + "px);\n      max-width: calc(" + percentage(fraction) + " - " + gutterWidth + "px);\n  \n      margin-right: " + (gutterRight - _this.gutterH) + "px;\n      margin-left: " + gutterLeft + "px;\n  \n      " + (center
                ? "\n            margin-left: " + _this.getOffset((1 - fraction) / 2) + ";\n            margin-right: " + _this.getOffset((1 - fraction) / 2) + ";\n          "
                : _this.offset(offset, gutterLeft)) + "\n    ";
        };
        this.offset = function (offset, gutter) {
            if (offset === void 0) { offset = 0; }
            if (gutter === void 0) { gutter = _this.gutterH; }
            return offset !== 0 ? "margin-left: " + _this.getOffset(offset, gutter) + ";" : '';
        };
        this.stack = function () {
            return "\n      flex-basis: 100%;\n      max-width: 100%;\n      margin-left: " + _this.gutterH + "px;\n    ";
        };
        this.fullBleed = function () {
            return "\n      flex-basis: 100%;\n      max-width: auto;\n      margin-left: -" + _this.gutterH + "px;\n      margin-right: -" + _this.gutterH + "px;\n    ";
        };
        this.center = function (fraction) {
            return "\n      max-width: calc((100% - " + _this.gutterH + "px) * " + fraction + " - " + _this.gutterH + "px);\n      margin: 0 auto;\n    ";
        };
        this.uncenter = function () {
            return "\n      max-width: none;\n      margin: 0;\n    ";
        };
        this.rows = function () {
            return "\n      display: block;\n      box-sizing: border-box;\n    \n      margin-left: -" + _this.gutterH + "px;\n      margin-right: -" + _this.gutterH + "px;\n      padding-right: " + _this.gutterH + "px;\n    \n      > " + _this.columnSelector + " {\n        box-sizing: border-box;\n        \n        margin-left: " + _this.gutterH + "px;\n        margin-bottom: " + _this.gutterH + "px;\n      }\n    ";
        };
        this.columns = function () {
            return "\n      display: flex;\n      flex-wrap: wrap;\n      box-sizing: border-box;\n    \n      margin-left: -" + _this.gutterH + "px;\n      margin-right: -" + _this.gutterH + "px;\n      padding-right: " + _this.gutterH + "px;\n      \n      > " + _this.columnSelector + " {\n        flex: 1 1 0%;\n        box-sizing: border-box;\n    \n        margin-left: " + _this.gutterH + "px;\n        margin-bottom: " + _this.gutterV + "px;\n    \n        > " + _this.containerSelector + " {\n          margin-bottom: -" + _this.gutterV + "px;\n        }\n      }\n    ";
        };
        // is global gutter given?
        if (options.gutter) {
            options.gutterH = options.gutter;
            options.gutterV = options.gutter;
            delete options.gutter;
        }
        Object.assign(this, options);
        this.Grid = styled_components_1.default.div.attrs({ className: this.containerSelector.substring(1) })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      ", "\n    "], ["\n      ", "\n    "])), this.columns());
    }
    Object.defineProperty(Subdivision.prototype, "gutter", {
        get: function () {
            return this.gutterH;
        },
        enumerable: true,
        configurable: true
    });
    Subdivision.prototype.getOffset = function (offset, gutter) {
        if (gutter === void 0) { gutter = this.gutterH; }
        return "calc(" + percentage(offset) + " + " + gutter + "px);";
    };
    return Subdivision;
}());
exports.default = Subdivision;
var templateObject_1;
