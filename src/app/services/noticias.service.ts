import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { respuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(  private http: HttpClient  ) { }

  getTopHeadlines() {

  return  this.http.get <respuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=8bf2f48ef1204acda04e508a23d54eb2`);

}

}
