import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core.module';
import { ChatbotComponent } from './Shared/Components/chatbot/chatbot.component';
import { LoaderComponent } from './Shared/Components/loader/loader.component';
import { SharedModule } from './Shared/shared.module';
import { FeaturesModule } from './Features/features.module';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [AppComponent, ChatbotComponent, LoaderComponent],
  imports: [
    SharedModule,
    CoreModule,
    FeaturesModule,
    NgxStripeModule.forRoot(
      'pk_test_51PUvLmRwM399IrYtbn0HNF7fYcwiRJMZJvVNo1XioIWkpKxlFanyWy8CdkB2va2tcvHIpd8yl337xW76Ya0LpHAW00OZwZclLA'
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
