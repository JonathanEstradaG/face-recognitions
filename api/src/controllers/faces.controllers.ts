import { Request, Response } from 'express';

class FacesController {

 public async getAll(request: Request, response: Response){
    try {
        console.log('Hola')
        const faces = await fetch('https://chyww223ch.execute-api.us-east-1.amazonaws.com/v0');
        response.json({faces})
    } catch (error) {
        response.status(403).json({error: 'Error'});
    }
 }
}

const facesController = new FacesController();
export default facesController;