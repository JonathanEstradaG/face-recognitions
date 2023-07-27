import { Component, OnInit } from '@angular/core';
import { FaceServices } from 'src/app/services/face.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public faceServices: FaceServices
  ) {}

  ngOnInit(): void {  
  }

  prueba(){ 
    this.faceServices.getAll().subscribe((res) => {
      console.log(res)
    });
  }

}
