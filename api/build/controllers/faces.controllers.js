"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FacesController {
    getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Hola');
                const faces = yield fetch('https://chyww223ch.execute-api.us-east-1.amazonaws.com/v0');
                response.json({ faces });
            }
            catch (error) {
                response.status(403).json({ error: 'Error' });
            }
        });
    }
}
const facesController = new FacesController();
exports.default = facesController;
