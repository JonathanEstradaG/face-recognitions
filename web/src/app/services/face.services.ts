import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class FaceServices {
    constructor(
        private httpClient: HttpClient,
    ) {   
    }

    getAll() {
        console.log(`${environment.host}/api/faces/getAll`)
        return this.httpClient.get(`${environment.host}/api/faces/getAll`)
    }
}