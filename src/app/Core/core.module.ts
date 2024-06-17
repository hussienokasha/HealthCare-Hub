import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { LoadingInterceptor } from './Interceptors/loading.interceptor';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' }, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },],
})
export class CoreModule { }
