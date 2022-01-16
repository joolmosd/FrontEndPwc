import { Component, OnInit } from '@angular/core';
import { UploadScriptsService } from '../Services/upload-scripts.service';
import * as M from '../../assets/materialize/js/materialize.min.js'
import { FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from '../Services/publication.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private _CardService:UploadScriptsService = new UploadScriptsService;
  options = 
  {
    fullWidth: true,
    indicators: true
    
  };
  
  optionsModal = 
  {

    
  };

  constructor(private fb: FormBuilder, private publicationService:PublicationService) { 
    this._CardService.cargaScripts(["popper.min","bootstrap.min"]);
  }

  formPublication= this.fb.group({
    description: ['', [Validators.required]],
    Img: ['', [Validators.required]]
  });

  ngOnInit(): void {
    var elems = document.querySelectorAll('.carousel');
    var elemsModal = document.querySelectorAll('.modal');
    var instancesModal = M.Modal.init(elemsModal, this.optionsModal);
    var instances = M.Carousel.init(elems, this.options);

  }

  savePublication(){

  }

}
