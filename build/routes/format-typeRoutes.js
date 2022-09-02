"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class FormatTypeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/format-types', (req, res) => res.send('Hello'));
    }
}
const formatTypeRoutes = new FormatTypeRoutes();
exports.default = formatTypeRoutes.router;
