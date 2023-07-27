import { Router } from "express";
import facesController from "../controllers/faces.controllers";

class FacesRoutes {
    public router: Router = Router();
    constructor(
        ) {
        this.routes();
    }

    routes(){
        this.router.get('/getAll', facesController.getAll);
    }
}

const facesRoutes = new FacesRoutes();
export default facesRoutes.router   