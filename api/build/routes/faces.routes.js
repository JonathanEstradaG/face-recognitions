"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faces_controllers_1 = __importDefault(require("../controllers/faces.controllers"));
class FacesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/getAll', faces_controllers_1.default.getAll);
    }
}
const facesRoutes = new FacesRoutes();
exports.default = facesRoutes.router;
