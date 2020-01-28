import { Injectable } from '@angular/core';
import {Storage  } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(  
        private storage: Storage,
        private toastCtrl: ToastController
        ) {

      this.cargarFavs();
   }


  async presentToasContorller( message: string ) {
    const toast = await this.toastCtrl.create({
   message,
  duration: 2000
  });  

 toast.present();
}

   guardarNoticia( noticia: Article ) {

      const existe = this.noticias.find( (noti: Article) => {
        noti.title === noticia.title
      } )

      if(!existe){

        this.noticias.unshift( noticia );
        this.storage.set('favoritos', this.noticias );
        this.presentToasContorller('Se agrego a favoritos');
        
      }
  
    }


  async cargarFavs( ) {
     // este servicio leera las noticias 
    const favoritos =  await this.storage.get('favoritos');
     

    if( favoritos ){
      
      this.noticias = favoritos;
      
     }else {
       this.noticias = [];
     }


     //  .then( (favoritos) =>  {
    //     console.log( favoritos );
    //   });

   }


   borrarNoticia ( noticia: Article ) {
        this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
        // regresa un arra sin el elemento atual
        this.storage.set('favoritos', this.noticias);
        this.presentToasContorller('Se elemino de favoritos');
   }

}
