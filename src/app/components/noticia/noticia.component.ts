import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos = false;

  constructor(  private iab: InAppBrowser, 
                private actionSheetCtrl: ActionSheetController, 
                private socialSharingCtrl:  SocialSharing,
                private dataLocalService: DataLocalService
                ) { }

  ngOnInit() {
    console.log('Favoritos',this.enFavoritos);
  }

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system'); 
    console.log('Noticia' );
  }


  async lanzarMeu() {  

    let guardarBorrarBoton;
    
    if( this.enFavoritos ){

      guardarBorrarBoton = {
        text: 'Eliminar de favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.borrarNoticia( this.noticia );
          console.log('Borrar de favorito');
        }
      }

    }else {
      guardarBorrarBoton = {
        text: 'Guardar Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.guardarNoticia( this.noticia );
          console.log('Play clicked');
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [ {
        text: 'compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked'); 
          this.socialSharingCtrl.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorrarBoton 
      , 
       {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  }
