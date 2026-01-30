import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { AuthModule } from './auth/auth.module';
import { TherapistModule } from './therapist/therapist.module';
import { UserModule } from './user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BooksComponent } from '../app/resources/books/books.component';
import { SongsComponent } from '../app/resources/songs/songs.component';
import { VideosComponent } from '../app/resources/videos/videos.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './nfh/home/home.component';
import { NavbarComponent } from './nfh/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AashaAuthComponent } from './aasha/aasha-auth/aasha-auth.component';
import { AashaModule } from './aasha/aasha.module';
import { RouterModule } from '@angular/router';

// ✅ Define the HttpLoaderFactory function
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AashaAuthComponent
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    TherapistModule,
    UserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    TherapistModule,
    HttpClientModule, // Required for HTTP requests
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AashaModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/auth', pathMatch: 'full' }
    ])
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { 


 
}
