import { Component } from '@angular/core';
import { LoadingService } from 'src/app/Core/Services/loading.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading = true;

  imageLoaded() {
    setTimeout(() => {
      this.isLoading = false; // Hide the loading spinner
    }, 1000); // You can adjust the delay as needed
  }
}
