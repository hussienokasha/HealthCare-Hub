import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileAvatarComponent } from '../Features/Components/profile-avatar/profile-avatar.component';
import { AppRoutingModule } from '../app-routing.module';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ProfileAvatarComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxTypedJsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatCardModule,
    AppRoutingModule,
    MatRadioModule,
    
    

  ],
  exports: [
    
    FooterComponent,
    NavbarComponent,
    HttpClientModule,
    FontAwesomeModule,
    NgxTypedJsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    ProfileAvatarComponent,
    MatRadioModule
  ],

})
export class SharedModule { }
