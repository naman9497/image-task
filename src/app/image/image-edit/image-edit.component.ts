import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Image } from '../../shared/image.model';
import { ImageListService } from '../image-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
  @ViewChild('locationInput', { static: false }) locationInputRef: ElementRef;

  private userLoc: string;
  constructor(private imgService: ImageListService, private http: HttpClient) { }

  ngOnInit() {
    this.getLocation(); 
    
  }

  onAddItem() {
    const name = this.nameInputRef.nativeElement.value;
    const file = this.fileInputRef.nativeElement.files[0];
    const fileName = this.fileInputRef.nativeElement.files[0].name;
    var location = this.locationInputRef.nativeElement.value;
    if(location == ''){
      location = this.userLoc;
    }
     this.getBase64(file).then(
      (data: string) => {
        const newImage = new Image(name, data, fileName, location);
        this.imgService.addImage(newImage);
      }
    );


  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.callApi(longitude, latitude);
        });
        
    } else {
       console.log("No support for geolocation")
    }
  }

  callApi(Longitude: number, Latitude: number){

    this.http.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.d9d446ba616a3856dad4574275d2d156&lat=${Latitude}&lon=${Longitude}&format=json`).subscribe((response)=>{
      this.userLoc = response.address.county;
    })
    
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
