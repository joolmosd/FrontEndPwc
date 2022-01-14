import { Component, OnInit } from '@angular/core';
import { UploadScriptsService } from '../Services/upload-scripts.service';
import * as M from '../../assets/materialize/js/materialize.min.js'

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {
  private _CardService:UploadScriptsService = new UploadScriptsService;
  options = 
  {
    fullWidth: true,
    indicators: true
    
  };
  constructor() { 
    this._CardService.cargaScripts(["popper.min","bootstrap.min"]);
  }

  ngOnInit(): void {

    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, this.options);
  }

}
