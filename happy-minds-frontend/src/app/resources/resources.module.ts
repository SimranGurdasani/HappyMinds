import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { SongsComponent } from './songs/songs.component';
import { VideosComponent } from './videos/videos.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule],
  exports: [
     MainComponent,
    BooksComponent,
    SongsComponent,
    VideosComponent],
  declarations: [
    MainComponent,
    BooksComponent,
    SongsComponent,
    VideosComponent
  ]

})
export class MediaRoutingModule { }
