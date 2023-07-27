import express from "express";
import morgan from "morgan";
import cors from "cors";
import { environment } from "./enviroments/environment";
import * as https from "https"
import facesRoutes from "./routes/faces.routes";



class Api {
    public app = express();

    constructor() {
        this.config();
        this.routes();
    }

    config(){
        this.app.set('port', process.env.PORT || 3000)
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json({limit: '50mb'}))
        this.app.use(express.urlencoded({extended: false}))
    }

    routes(){
        this.app.use('/api/faces', facesRoutes);
    }

    start(){
        if (environment.production === true) {
            const httpsServer = https.createServer(this.app);
            httpsServer.listen(3001);
            console.log('Server on port', '3001');
        } else {
            this.app.listen(this.app.get('port'), () => {
                console.log('Server on port', this.app.get('port'));
            });
        }
    }
}

const api = new Api();
api.start();