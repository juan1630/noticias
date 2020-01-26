import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { respuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl =  environment.apiUrl;
const headers = new HttpHeaders({
  'X-api-key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLines = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(  private http: HttpClient  ) { }


  private ejecutarQuery <T>(  query: string )  {

    query  = apiUrl + query;

    return this.http.get<T>(query, {  headers });


  }

  getTopHeadlines() {
    this.headLines++;
    // return  this.http.get <respuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=8bf2f48ef1204acda04e508a23d54eb2`);
    return this.ejecutarQuery<respuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLines}`);

}


  getCategoria( categoria: string  ) {


    if( this.categoriaActual === categoria  ) {
      
      this.categoriaPage++; 

    }else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;

    }
    
    return this.ejecutarQuery<respuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
 
  }

}
