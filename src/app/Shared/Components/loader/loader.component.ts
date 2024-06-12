import { Component } from '@angular/core';
import { LoadingService } from 'src/app/Core/Services/loading.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading = this.loadingService.loading;

  constructor(private loadingService: LoadingService) {

  }
}
