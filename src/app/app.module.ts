// import { CheckoutComponent } from './Features/Views/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core.module';
import { ChatbotComponent } from './Shared/Components/chatbot/chatbot.component';
import { LoaderComponent } from './Shared/Components/loader/loader.component';
import { SharedModule } from './Shared/shared.module';
import { FeaturesModule } from './Features/features.module';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ChatbotComponent, LoaderComponent, SuccessDialogComponent],
  imports: [SharedModule, CoreModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
