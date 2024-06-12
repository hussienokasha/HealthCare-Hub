import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent {

  show:boolean=false;
  route:Router = inject(Router);
  log=inject(AuthService);
  onClick(){
    this.show=!this.show;
  }
  logout() {
    this.log.logout();
   this.route.navigate(['/home'])
  }
}
