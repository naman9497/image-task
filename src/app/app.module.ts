import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImageListComponent } from './image/image-list.component';
import { ImageEditComponent } from './image/image-edit/image-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ImageListService } from './image/image-list.service';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageListComponent,
    ImageEditComponent,
    DropdownDirective,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
   ],
  providers: [ImageListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
