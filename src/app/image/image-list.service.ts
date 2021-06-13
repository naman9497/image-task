import { Image } from '../shared/image.model';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
 
export class ImageListService {
 
  
  imageChanged = new EventEmitter<Image[]>();

  private images: Image[] = [];
  
  private httpOptions = {
    headers: new HttpHeaders({
       'Access-Control-Allow-Origin' : '*',
      "Access-Control-Allow-Headers" :  "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods" : "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      
    })
  };  

  constructor(private http: HttpClient) { 
    this.http.get<Image[]>('api/images/get-all').subscribe((response) => {
      this.images = response;
    });
  }

 

  getImages()  {
    return this.images;
  }

  addImage(image: Image) {
    
 
     this.http.post<Image>('api/images/store', image, this.httpOptions)
     .subscribe(data=>{
       console.log(data);
     }
 
    );
    this.images.push(image);
    this.imageChanged.emit(this.images.slice());
  }

  addImages(images: Image[]) {
    this.images.push(...images);
    this.imageChanged.emit(this.images.slice());
  }
}
