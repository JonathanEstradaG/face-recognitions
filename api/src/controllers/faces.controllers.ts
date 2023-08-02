import { Request, Response } from 'express';
import fetch from 'node-fetch';
import * as xml2js from 'xml2js'

class FacesController {

    public async getAll(request: Request, response: Response) {
        try {
            const faces = await fetch('https://chyww223ch.execute-api.us-east-1.amazonaws.com/v0');
            const xml = await faces.text()
            xml2js.parseString(xml, function (err, result) {
                console.dir(result);
                response.json(result)
            });
        } catch (error) {
            console.log(error)
            response.status(403).json({ error: 'Error' });
        }
    }
}

const facesController = new FacesController();
export default facesController;