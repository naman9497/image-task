import { Component, OnInit } from '@angular/core';

import { Image } from '../shared/image.model';
import { ImageListService } from './image-list.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: Image[];

  constructor(private imgService: ImageListService) { }

  ngOnInit() {
    this.images = this.imgService.getImages();
    console.log(this.images);
    this.imgService.imageChanged
      .subscribe(
        (images: Image[]) => {
          this.images = images;
        }
      );
  }
}
