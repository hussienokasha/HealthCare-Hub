import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core.module';
import { ChatbotComponent } from './Shared/Components/chatbot/chatbot.component';
import { LoaderComponent } from './Shared/Components/loader/loader.component';
import { SharedModule } from './Shared/shared.module';
import { FeaturesModule } from './Features/features.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    LoaderComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    FeaturesModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
