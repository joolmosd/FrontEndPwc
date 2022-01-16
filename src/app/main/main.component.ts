import { Component, OnInit } from '@angular/core';
import { UploadScriptsService } from '../Services/upload-scripts.service';
import * as M from '../../assets/materialize/js/materialize.min.js'
import { FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from '../Services/publication.service';
import { Publication } from '../Entities/Publication';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  publications: Publication[] = []

  private _CardService:UploadScriptsService = new UploadScriptsService;
  options = 
  {
    fullWidth: true,
    indicators: true
    
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
    var instancesModal = M.Modal.init(elemsModal);
    var instances = M.Carousel.init(elems, this.options);

    this.publicationService.getAll().subscribe(
      data =>{
        this.publications = data;
      }
    )


  }

  savePublication(){

    const data = {
      description: this.formPublication.controls.description.value,
      url:this.formPublication.controls.Img.value
    }
    this.publicationService.save(data).subscribe(
      result => {
        Swal.fire('Publication Created!', '', 'success')
        this.publicationService.getAll().subscribe(
          data =>{
            this.publications = data;
          }
        )
      }
    )
  }

  updatePublication(){

    const data ={
      description: this.formPublication.controls["description"].value,
      url: this.formPublication.controls["Img"].value,

    }

  }

  delete(id: any){

  }

}
