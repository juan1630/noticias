import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment : IonSegment;


  categorias = ['general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(  private noticiasService: NoticiasService  ) {}


  ngOnInit() {
   this.segment.value = this.categorias[0];
    this.cargarNoticias( this.categorias[0] );

  } 

  cambioCategoria( event ) {
    
    this.noticias = [];
    this.cargarNoticias(event.detail.value)
  
  }


  
  cargarNoticias( categoria: string ) {

      this.noticiasService.getCategoria( categoria ).subscribe( (res) => {
      console.log(res);
      this.noticias.push( ...res.articles )
    } )

  }

}