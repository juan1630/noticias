import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiasComponent } from './noticias/noticias.component';



@NgModule({
  declarations: [],
  exports: [ 
    NoticiasComponent 
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
